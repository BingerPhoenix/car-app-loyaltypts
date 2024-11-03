import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StepIndicator = ({ 
  currentStep, 
  totalSteps,
  completedSteps,
  onStepClick
}) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <div 
              className={`w-12 h-0.5 mx-2 ${
                i <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          )}
          <button
            onClick={() => {
              if (i <= Math.max(...completedSteps)) {
                onStepClick(i);
              }
            }}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-colors relative
              ${i === currentStep
                ? 'bg-blue-500 text-white'
                : completedSteps.includes(i)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }
              ${i <= Math.max(...completedSteps) ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}
            `}
          >
            {completedSteps.includes(i) ? (
              <Check className="w-4 h-4" />
            ) : (
              i + 1
            )}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export const MultiStepForm = ({ 
  steps,
  onComplete,
  initialValues = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepData, setStepData] = useState({});

  const methods = useForm({
    defaultValues: initialValues
  });

  const { handleSubmit, trigger, getValues } = methods;

  const goToNextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      const newData = getValues();
      setStepData(prev => ({
        ...prev,
        ...newData
      }));
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToStep = (step) => {
    if (step <= Math.max(...completedSteps, currentStep)) {
      setCurrentStep(step);
    }
  };

  const handleStepSubmit = async (data) => {
    const isLastStep = currentStep === steps.length - 1;
    if (isLastStep) {
      const finalData = {
        ...stepData,
        ...data
      };
      await onComplete(finalData);
    } else {
      goToNextStep();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={steps.length}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />

        <Card className="p-6">
          <form onSubmit={handleSubmit(handleStepSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    {steps[currentStep].title}
                  </h2>
                  {steps[currentStep].description && (
                    <p className="text-gray-500 mt-1">
                      {steps[currentStep].description}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  {steps[currentStep].fields}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button type="submit">
                {currentStep === steps.length - 1 ? (
                  'Complete'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* Step Summary (optional) */}
        {Object.keys(stepData).length > 0 && (
          <Card className="mt-6 p-4 bg-gray-50">
            <h3 className="text-sm font-medium mb-2">Progress Summary</h3>
            <div className="space-y-2">
              {Object.entries(stepData).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-500">{key}:</span>
                  <span className="font-medium">
                    {typeof value === 'boolean' ? value ? 'Yes' : 'No' : value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </FormProvider>
  );
};