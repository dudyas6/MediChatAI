import React from 'react';
import { NavLink } from 'react-router-dom';


const ListItem = ({ to, textContent }) => {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive
                        ? "block py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                }
            >
                {textContent}
            </NavLink>
        </li>
    );
};

export default ListItem;