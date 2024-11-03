import { useCallback } from 'react';
import { useForm } from '@/context/FormContext';

export const useFormField = (name) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateField
  } = useForm();

  const onChange = useCallback((e) => {
    const value = e?.target?.type === 'checkbox' 
      ? e.target.checked 
      : e?.target?.value ?? e;
    handleChange(name, value);
  }, [handleChange, name]);

  const onBlur = useCallback(() => {
    handleBlur(name);
  }, [handleBlur, name]);

  return {
    value: values[name],
    error: errors[name],
    touched: touched[name],
    onChange,
    onBlur,
    setValue: (value) => setFieldValue(name, value),
    setError: (error) => setFieldError(name, error),
    clearError: () => clearFieldError(name),
    validate: () => validateField(name),
    fieldProps: {
      id: name,
      name,
      value: values[name] || '',
      onChange,
      onBlur,
      'aria-invalid': errors[name] ? 'true' : 'false',
      'aria-describedby': errors[name] ? `${name}-error` : undefined
    }
  };
};