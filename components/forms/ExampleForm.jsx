import React from 'react';
import { FormProvider } from '@/context/FormContext';
import { useFormField } from '@/hooks/useFormField';
import { 
  Input,
  Select,
  Checkbox,
  Textarea,
  FormActions 
} from './FormComponents';
import {
  validateRequired,
  validateEmail,
  validatePassword,
  composeValidators
} from '@/utils/formValidation';

// Example form fields component using the form context
const ContactFields = () => {
  const email = useFormField('email');
  const name = useFormField('name');
  const message = useFormField('message');
  const subscribe = useFormField('subscribe');

  return (
    <div className="space-y-4">
      <Input
        label="Name"
        required
        {...name.fieldProps}
        error={name.touched && name.error}
      />

      <Input
        label="Email"
        type="email"
        required
        {...email.fieldProps}
        error={email.touched && email.error}
      />

      <Textarea
        label="Message"
        required
        {...message.fieldProps}
        error={message.touched && message.error}
      />

      <Checkbox
        label="Subscribe to newsletter"
        {...subscribe.fieldProps}
      />
    </div>
  );
};

// Example form implementation
const ExampleForm = () => {
  const handleSubmit = async (values) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', values);
  };

  const validationSchema = {
    name: validateRequired,
    email: composeValidators(validateRequired, validateEmail),
    message: validateRequired,
    subscribe: (value) => null // Optional field
  };

  const initialValues = {
    name: '',
    email: '',
    message: '',
    subscribe: false
  };

  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <ContactFields />

        <FormActions>
          <button
            type="button"
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </FormActions>
      </form>
    </FormProvider>
  );
};

export default ExampleForm;