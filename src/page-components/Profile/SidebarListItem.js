import React from 'react';

const SidebarListItem = ({ name, icon, onClick }) => {
  return (
    <li onClick={onClick}>
    <button
      className="mt-4 dark:text-white text-[#333] text-sm flex items-center hover:text-blue-600 transition-all"
    >
      {icon}
      <span>{name}</span>
    </button>
  </li>
  );
};

export default SidebarListItem;
