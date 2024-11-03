/**
 * API Client utility for handling HTTP requests
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const apiClient = {
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      data = null,
      headers = {},
      withAuth = true,
      signal = null
    } = options;

    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };

    if (withAuth) {
      // Add authentication token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const config = {
      method,
      headers: requestHeaders,
      signal
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new ApiError(
          responseData.message || 'An error occurred',
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request was cancelled');
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        'Network error occurred',
        0,
        { originalError: error.message }
      );
    }
  },

  // Convenience methods
  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', data });
  },

  put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', data });
  },

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', data });
  },

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
};