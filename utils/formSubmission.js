import { apiClient } from './apiClient';

/**
 * Form submission utilities with advanced features
 */
export const formSubmissionHandler = {
  async submitForm({
    endpoint,
    values,
    onSuccess,
    onError,
    options = {},
    transformData
  }) {
    try {
      // Transform data before submission if needed
      const submissionData = transformData ? transformData(values) : values;

      // Handle file uploads if present
      const hasFiles = Object.values(submissionData).some(
        value => value instanceof File || value instanceof FileList
      );

      if (hasFiles) {
        return await this.submitFormWithFiles({
          endpoint,
          values: submissionData,
          onSuccess,
          onError,
          options
        });
      }

      const response = await apiClient.post(endpoint, submissionData, options);

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      throw error;
    }
  },

  async submitFormWithFiles({
    endpoint,
    values,
    onSuccess,
    onError,
    options = {}
  }) {
    try {
      const formData = new FormData();

      // Append all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach(file => {
            formData.append(key, file);
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
        ...options,
        headers: {
          ...options.headers,
          // Don't set Content-Type, let the browser set it with the boundary
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Form submission failed');
      }

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (error) {
      if (onError) {
        onError(error);
      }
      throw error;
    }
  },

  validateFiles(files, config = {}) {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = [],
      maxFiles = 5
    } = config;

    const errors = [];

    if (files.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
    }

    Array.from(files).forEach(file => {
      if (file.size > maxSize) {
        errors.push(`File "${file.name}" exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
      }

      if (allowedTypes.length && !allowedTypes.includes(file.type)) {
        errors.push(`File "${file.name}" has unsupported type. Allowed types: ${allowedTypes.join(', ')}`);
      }
    });

    return errors;
  },

  // Handle rate limiting and retries
  async withRetry(fn, { maxRetries = 3, delay = 1000 } = {}) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) throw error;

        if (error.status === 429) { // Too Many Requests
          const retryAfter = parseInt(error.headers?.get('Retry-After')) || delay;
          await new Promise(resolve => setTimeout(resolve, retryAfter));
          continue;
        }

        throw error;
      }
    }
  }
};

/**
 * Form submission hooks for common use cases
 */
export const useFormSubmission = ({
  endpoint,
  method = 'POST',
  onSuccess,
  onError,
  options = {}
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const submit = React.useCallback(async (values) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await apiClient[method.toLowerCase()](endpoint, values, options);
      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (error) {
      setSubmitError(error.message);
      if (onError) {
        onError(error);
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [endpoint, method, options, onSuccess, onError]);

  return {
    submit,
    isSubmitting,
    submitError,
    clearError: () => setSubmitError(null)
  };
};

/**
 * Helper to handle file uploads with progress tracking
 */
export const useFileUpload = (config = {}) => {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(null);

  const upload = React.useCallback(async (files, endpoint) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const validationErrors = formSubmissionHandler.validateFiles(files, config);
    if (validationErrors.length > 0) {
      setUploadError(validationErrors.join('. '));
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    try {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(progress);
        }
      });

      const response = await new Promise((resolve, reject) => {
        xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });

      setUploadProgress(100);
      return response;
    } catch (error) {
      setUploadError(error.message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, [config]);

  return {
    upload,
    isUploading,
    uploadProgress,
    uploadError,
    clearError: () => setUploadError(null)
  };
};