import React from "react";

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="text-sm mb-2 block">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default InputField;