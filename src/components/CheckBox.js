import React from "react";

const Checkbox = ({ label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={checked}
      className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      onChange={onChange}
    />
    <label className="ml-3 block text-sm">{label}</label>
  </div>
);

export default Checkbox;