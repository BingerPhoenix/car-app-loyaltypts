import React from 'react';
import { useFieldArray, FormProvider, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Input, Select, Checkbox, Textarea } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const FieldWrapper = ({ children, label, error, required }) => (
  <div className="space-y-1">
    {label && (
      <label className="text-sm font-medium flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}
    {children}
    {error && (
      <span className="text-sm text-red-500">{error}</span>
    )}
  </div>
);

const DynamicField = ({ 
  field, 
  register, 
  errors,
  control,
  watch 
}) => {
  const value = watch(field.name);

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
      return (
        <Input
          type={field.type}
          {...register(field.name, field.validation)}
          error={errors[field.name]?.message}
          placeholder={field.placeholder}
        />
      );

    case 'select':
      return (
        <Select
          {...register(field.name, field.validation)}
          error={errors[field.name]?.message}
          options={field.options}
          placeholder={field.placeholder}
        />
      );

    case 'checkbox':
      return (
        <Checkbox
          {...register(field.name, field.validation)}
          label={field.label}
          error={errors[field.name]?.message}
        />
      );

    case 'textarea':
      return (
        <Textarea
          {...register(field.name, field.validation)}
          error={errors[field.name]?.message}
          placeholder={field.placeholder}
        />
      );

    case 'repeatable':
      return (
        <RepeatableFields
          name={field.name}
          control={control}
          template={field.template}
          errors={errors}
        />
      );

    case 'conditional':
      return (
        <ConditionalFields
          condition={field.condition(value)}
          fields={field.fields}
          register={register}
          errors={errors}
          control={control}
          watch={watch}
        />
      );

    default:
      return null;
  }
};

const RepeatableFields = ({ 
  name, 
  control, 
  template,
  errors 
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium">Item {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>

              <div className="space-y-4">
                {template.map((templateField, fieldIndex) => (
                  <FieldWrapper
                    key={fieldIndex}
                    label={templateField.label}
                    error={errors[name]?.[index]?.[templateField.name]?.message}
                    required={templateField.validation?.required}
                  >
                    <DynamicField
                      field={{
                        ...templateField,
                        name: `${name}.${index}.${templateField.name}`
                      }}
                      register={control.register}
                      errors={errors}
                      control={control}
                      watch={control.watch}
                    />
                  </FieldWrapper>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => append({})}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>
    </div>
  );
};

const ConditionalFields = ({ 
  condition, 
  fields, 
  register,
  errors,
  control,
  watch 
}) => {
  if (!condition) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {fields.map((field, index) => (
        <FieldWrapper
          key={index}
          label={field.label}
          error={errors[field.name]?.message}
          required={field.validation?.required}
        >
          <DynamicField
            field={field}
            register={register}
            errors={errors}
            control={control}
            watch={watch}
          />
        </FieldWrapper>
      ))}
    </motion.div>
  );
};

export const DynamicForm = ({ 
  fields, 
  onSubmit,
  defaultValues = {},
  validationSchema = {} 
}) => {
  const methods = useForm({
    defaultValues,
    resolver: validationSchema
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <FieldWrapper
            key={index}
            label={field.label}
            error={errors[field.name]?.message}
            required={field.validation?.required}
          >
            <DynamicField
              field={field}
              register={register}
              errors={errors}
              control={control}
              watch={watch}
            />
          </FieldWrapper>
        ))}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
};