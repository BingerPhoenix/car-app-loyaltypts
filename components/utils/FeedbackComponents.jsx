import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle,
  X,
  ExternalLink 
} from 'lucide-react';

export const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  action,
  onClose 
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-800'
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      textColor: 'text-green-800'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: AlertCircle,
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-800'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: XCircle,
      iconColor: 'text-red-500',
      textColor: 'text-red-800'
    }
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`p-4 ${style.bg} border ${style.border} rounded-lg relative`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${style.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${style.textColor}`}>
              {title}
            </h3>
          )}
          {message && (
            <div className={`text-sm ${style.textColor} mt-1`}>
              {message}
            </div>
          )}
          {action && (
            <div className="mt-4">
              <button
                className={`text-sm font-medium ${style.textColor} 
                  hover:opacity-75 inline-flex items-center gap-1`}
                onClick={action.onClick}
              >
                {action.label}
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {onClose && (
          <button
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 
              hover:bg-white/25 focus:ring-2 focus:ring-offset-2 
              focus:ring-offset-${type}-50 focus:ring-${type}-600`}
            onClick={onClose}
          >
            <span className="sr-only">Dismiss</span>
            <X className={`h-5 w-5 ${style.iconColor}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <Alert
        type={type}
        message={message}
        onClose={onClose}
      />
    </div>
  );
};

export const EmptyState = ({
  icon: Icon = Info,
  title,
  description,
  action
}) => (
  <div className="text-center py-12">
    <div className="flex justify-center mb-4">
      <div className="p-3 bg-gray-100 rounded-full">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {title}
    </h3>
    {description && (
      <p className="text-gray-500 max-w-sm mx-auto mb-6">
        {description}
      </p>
    )}
    {action && (
      <button
        onClick={action.onClick}
        className="inline-flex items-center px-4 py-2 border border-transparent 
          text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 
          hover:bg-blue-700 focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-blue-500"
      >
        {action.label}
      </button>
    )}
  </div>
);