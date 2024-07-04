// Components/UI/Button.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ onClick, children }) => {
  const nav = useNavigate();
  return (
    <button
      onClick={onClick}
      className="bg-primary transition hover:bg-[#158ace] px-10 py-5 shadow-lg rounded-3xl text-white"
    >
      {children}
    </button>
  );
};

export default Button;
