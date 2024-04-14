import React from 'react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-r-2 border-gray-900"></div>
    </div>
  );
};