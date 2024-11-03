import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
    </div>
  );
};

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <Spinner size="xl" className="mb-4" />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

export const SkeletonLoader = ({ count = 1, type = 'line' }) => {
  const getSkeletonClass = () => {
    switch (type) {
      case 'circle':
        return 'h-12 w-12 rounded-full';
      case 'button':
        return 'h-10 w-24 rounded-lg';
      case 'card':
        return 'h-32 w-full rounded-lg';
      default:
        return 'h-4 w-full rounded';
    }
  };

  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`bg-gray-200 ${getSkeletonClass()}`}
        />
      ))}
    </div>
  );
};

export const LoadingCard = ({ title }) => (
  <div className="p-6 rounded-lg border bg-white">
    <div className="flex items-center gap-4">
      <Spinner size="md" />
      <div className="font-medium text-gray-600">{title}</div>
    </div>
  </div>
);