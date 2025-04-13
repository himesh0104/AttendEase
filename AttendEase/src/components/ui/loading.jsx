import React from 'react';

export const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    default: 'h-8 w-8',
    large: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-b-2 border-current ${sizeClasses[size]}`}></div>
    </div>
  );
};

export const LoadingPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" />
  </div>
);

export const LoadingOverlay = () => (
  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <LoadingSpinner size="large" className="text-white" />
  </div>
); 