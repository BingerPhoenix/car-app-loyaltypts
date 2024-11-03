import React from 'react';
import { Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/helpers';

export const Input = React.forwardRef(({
  label,
  error,
  hint,
  required,
  className = "",
  type = "text",
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all",
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {(error || hint) && (
        <div className={cn(
          "text-sm flex items-center gap-1",
          error ? "text-red-500" : "text-gray-500"
        )}>
          {error && <AlertCircle className="h-4 w-4" />}
          {error || hint}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Select = React.forwardRef(({
  label,
  error,
  hint,
  required,
  options = [],
  placeholder = "Select an option",
  className = "",
  ...props
}, ref) => (
  <div className="space-y-1">
    {label && (
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}

    <select
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all",
        error 
          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    {(error || hint) && (
      <div className={cn(
        "text-sm flex items-center gap-1",
        error ? "text-red-500" : "text-gray-500"
      )}>
        {error && <AlertCircle className="h-4 w-4" />}
        {error || hint}
      </div>
    )}
  </div>
));

Select.displayName = 'Select';

export const Checkbox = React.forwardRef(({
  label,
  error,
  className = "",
  ...props
}, ref) => (
  <div className="flex items-start gap-2">
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
        error && "border-red-300",
        className
      )}
      {...props}
    />
    {label && (
      <label className="text-sm text-gray-700">
        {label}
        {error && (
          <span className="text-red-500 text-sm ml-1">
            ({error})
          </span>
        )}
      </label>
    )}
  </div>
));

Checkbox.displayName = 'Checkbox';

export const Radio = React.forwardRef(({
  label,
  error,
  className = "",
  ...props
}, ref) => (
  <div className="flex items-center gap-2">
    <input
      ref={ref}
      type="radio"
      className={cn(
        "h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500",
        error && "border-red-300",
        className
      )}
      {...props}
    />
    {label && (
      <label className="text-sm text-gray-700">
        {label}
      </label>
    )}
  </div>
));

Radio.displayName = 'Radio';

export const Textarea = React.forwardRef(({
  label,
  error,
  hint,
  required,
  className = "",
  ...props
}, ref) => (
  <div className="space-y-1">
    {label && (
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}

    <textarea
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all",
        error 
          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
        className
      )}
      {...props}
    />

    {(error || hint) && (
      <div className={cn(
        "text-sm flex items-center gap-1",
        error ? "text-red-500" : "text-gray-500"
      )}>
        {error && <AlertCircle className="h-4 w-4" />}
        {error || hint}
      </div>
    )}
  </div>
));

Textarea.displayName = 'Textarea';

export const FormActions = ({ children, alignment = 'right' }) => (
  <div className={cn(
    "flex gap-3 mt-6",
    alignment === 'right' && "justify-end",
    alignment === 'center' && "justify-center",
    alignment === 'between' && "justify-between"
  )}>
    {children}
  </div>
);