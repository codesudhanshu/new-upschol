// components/Loader.js
import React from 'react';

export const Loader = ({ size = 4, color = 'text-blue-600' }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${color}`}></div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <Loader size={8} />
    </div>
  );
};