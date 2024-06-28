import React from 'react';

const ErrorMessage = ({ message }) => {
  const textLines = typeof message.text === 'string' ? message.text.split("\n") : [];

  return (
    <div className="relative">
      <div
        className={`font-bold text-sm mt-6 text-center ${
          message.type === "error" ? "text-red-600" : "text-green-600"
        }`}
      >
        {textLines ? textLines.map((str, index) => (
          <p key={index}>{str}</p>
        )) : message.text}
      </div>
    </div>
  );
};

export default ErrorMessage;
