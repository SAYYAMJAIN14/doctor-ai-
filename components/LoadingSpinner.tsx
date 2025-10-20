
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div>
      <p className="mt-4 text-lg font-semibold text-text-secondary">Generating your personalized insights...</p>
    </div>
  );
};
