import React, { useState } from 'react';
import ListItem from './ListItem';
import medichatLogo from '../../Assets/Logos/medichat.png';
import { useAuth } from '../Services/AuthContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={medichatLogo} className="h-8" alt="MediChat Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MediChat</span>
        </div>
        <div className="relative flex items-center">
          <button
            id="dropdownNavbarLink"
            onClick={handleToggle}
            className="flex md:hidden items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div id="navbar" className="hidden md:flex w-full md:w-auto">
            <ul className="font-medium flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <ListItem to="/" textContent="Home" />
              <ListItem to="/about" textContent="About" />
              <ListItem to="/contact" textContent="Contact" />
              { currentUser ? <ListItem to="/profile" textContent="Profile" /> : null }    
            </ul>
          </div>
          <div
            id="dropdownNavbar"
            className={`absolute right-0 mt-2 z-10 ${menuOpen ? 'flex' : 'hidden'} md:hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul className="min-w-full py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
              <ListItem to="/" textContent="Home" />
              <ListItem to="/about" textContent="About" />
              <ListItem to="/contact" textContent="Contact" />
              { currentUser ? <ListItem to="/profile" textContent="Profile" /> : null }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
