// Components/UI/Button.js
import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button className="bg-primary transition hover:bg-[#158ace] px-10 py-5 shadow-lg rounded-3xl text-white"
            onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
