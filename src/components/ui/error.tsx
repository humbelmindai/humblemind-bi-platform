import React from 'react';
import { cn } from '@/lib/utils';
import { ErrorProps } from '@/types';
import Button from './button';

const Error: React.FC<ErrorProps> = ({ 
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
  children 
}) => {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="mx-auto h-24 w-24 text-red-400 mb-4">
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-500">{message}</p>
      
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} variant="primary">
            Try Again
          </Button>
        </div>
      )}
      
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default Error; 