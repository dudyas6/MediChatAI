// components/UI/LoadingButton.js
import React from 'react';

const LoadingButton = ({ loading, buttonText, ...props }) => {
  return (
    <button
      className={` px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded focus:outline-none ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
            />
          </svg>
          Loading...
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default LoadingButton;
