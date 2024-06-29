// ListItem.js

import React from 'react';
import { Link } from 'react-scroll';

const ListItem = ({ to, textContent }) => {
  return (
    <li>
      <Link
        to={to}
        spy={true}
        smooth={true}
        offset={-70} // Adjust this value based on your navbar height
        duration={500}
        className="cursor-pointer block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      >
        {textContent}
      </Link>
    </li>
  );
};

export default ListItem;
