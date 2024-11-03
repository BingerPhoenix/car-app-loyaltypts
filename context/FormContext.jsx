import React, { createContext, useContext, useCallback, useRef } from 'react';
import { validateForm } from '@/utils/formValidation';

const FormContext = createContext(null);

export function FormProvider({ 
  initialValues = {}, 
  validationSchema = {},
  onSubmit,
  children 
}) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const mountedRef = useRef(true);

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      // Re-validate field on change if it's been touched
      const fieldValidators = validationSchema[name];
      if (fieldValidators) {
        const fieldError = validateForm({ [name]: value }, { [name]: fieldValidators })[name];
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    }
  }, [touched, validationSchema]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    // Validate field on blur
    const fieldValidators = validationSchema[name];
    if (fieldValidators) {
      const fieldError = validateForm({ [name]: values[name] }, { [name]: fieldValidators })[name];
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  }, [values, validationSchema]);

  const validateField = useCallback((name) => {
    const fieldValidators = validationSchema[name];
    if (fieldValidators) {
      const fieldError = validateForm({ [name]: values[name] }, { [name]: fieldValidators })[name];
      setErrors(prev => ({ ...prev, [name]: fieldError }));
      return !fieldError;
    }
    return true;
  }, [values, validationSchema]);

  const validateAllFields = useCallback(() => {
    const newErrors = validateForm(values, validationSchema);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Mark all fields as touched
    setTouched(
      Object.keys(validationSchema).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Validate all fields
    const isValid = validateAllFields();

    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        if (mountedRef.current) {
          setErrors(prev => ({
            ...prev,
            submit: error.message || 'An error occurred during submission'
          }));
        }
      } finally {
        if (mountedRef.current) {
          setIsSubmitting(false);
        }
      }
    }
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    handleChange(name, value);
  }, [handleChange]);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const clearFieldError = useCallback((name) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const contextValue = {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateField,
    validateAllFields,
    resetForm
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};