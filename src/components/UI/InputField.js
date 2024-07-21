import React from "react";
import icons from "@/components/Shared/Icons"; // Adjust the path as necessary

const InputField = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
  iconName,
  onIconClick,
  isPasswordVisible,
}) => {
  const getIconComponent = () => {
    const icon = icons[iconName];
    return icon;
  };

  return (
    <div className="mt-8">
      <label className="text-gray-800 text-xs block mb-2">{label}</label>
      <div className="relative flex items-center">
        <input
          name={name}
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          className="w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
        {iconName && (
          <div onClick={onIconClick} className="absolute right-2">
            {getIconComponent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
