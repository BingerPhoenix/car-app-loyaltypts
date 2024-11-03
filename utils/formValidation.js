/**
 * Form validation utilities
 */

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const validateRequired = (value) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return 'This field is required';
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) return null;
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null;
  if (!PHONE_REGEX.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return null;

  const errors = [];
  if (password.length < 8) {
    errors.push('at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('one special character');
  }

  if (errors.length > 0) {
    return `Password must contain ${errors.join(', ')}`;
  }
  return null;
};

export const validateMatch = (value1, value2, fieldName = 'Values') => {
  if (value1 !== value2) {
    return `${fieldName} must match`;
  }
  return null;
};

export const validateLength = (value, { min, max } = {}) => {
  if (!value) return null;

  if (min && value.length < min) {
    return `Must be at least ${min} characters`;
  }
  if (max && value.length > max) {
    return `Must be no more than ${max} characters`;
  }
  return null;
};

export const validateNumber = (value, { min, max } = {}) => {
  if (!value) return null;

  const num = Number(value);
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  if (min !== undefined && num < min) {
    return `Must be at least ${min}`;
  }
  if (max !== undefined && num > max) {
    return `Must be no more than ${max}`;
  }
  return null;
};

export const validateUrl = (url) => {
  if (!url) return null;

  try {
    new URL(url);
    return null;
  } catch (e) {
    return 'Please enter a valid URL';
  }
};

export const validateDate = (date, { min, max } = {}) => {
  if (!date) return null;

  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date';
  }

  if (min && dateObj < new Date(min)) {
    return `Date must be after ${new Date(min).toLocaleDateString()}`;
  }
  if (max && dateObj > new Date(max)) {
    return `Date must be before ${new Date(max).toLocaleDateString()}`;
  }
  return null;
};

export const composeValidators = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

// Form-level validation helper
export const validateForm = (values, validationSchema) => {
  const errors = {};

  Object.keys(validationSchema).forEach(field => {
    const validators = validationSchema[field];
    if (Array.isArray(validators)) {
      for (const validator of validators) {
        const error = validator(values[field]);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    } else {
      const error = validators(values[field]);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};