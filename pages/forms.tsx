import React from 'react';
import DynamicForm from '../components/forms/DynamicForm';
import ExampleForm from '../components/forms/ExampleForm';
import FileUpload from '../components/forms/FileUpload';
import FormComponents from '../components/forms/FormComponents';
import MultiStepForm from '../components/forms/MultiStepForm';
import SignaturePad from '../components/forms/SignaturePad';
import SmartFormAssistant from '../components/forms/SmartFormAssistant';

const FormsPage: React.FC = () => {
  return (
    <div>
      <h1>Forms Page</h1>
      <DynamicForm />
      <ExampleForm />
      <FileUpload />
      <FormComponents />
      <MultiStepForm />
      <SignaturePad />
      <SmartFormAssistant />
    </div>
  );
};

export default FormsPage;