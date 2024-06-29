import React, { useState } from 'react';
import { useTheme } from 'Components/Services/ThemeContext';

const AccessibilityMenu = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(document.body.classList.contains('high-contrast'));

  const handleIncreaseTextSize = () => {
    const root = document.documentElement;
    const currentFontSize = window.getComputedStyle(root).fontSize;
    const newSize = parseFloat(currentFontSize) * 1.25; // Increase by 25%
    root.style.fontSize = `${newSize}px`;
  };

  const handleDecreaseTextSize = () => {
    const root = document.documentElement;
    const currentFontSize = window.getComputedStyle(root).fontSize;
    const newSize = parseFloat(currentFontSize) * 0.8; // Decrease by 20%
    root.style.fontSize = `${newSize}px`;
  };

  const handleToggleHighContrast = () => {
    const body = document.body;
    body.classList.toggle('high-contrast');
    setHighContrast(!highContrast);
  };

  return (
    <>
      <div className="fixed bottom-3 right-4 z-50">
        <button 
          className={`bg-white text-black dark:bg-gray-800 dark:text-white rounded-full p-2 shadow-md`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="https://developer.apple.com/assets/elements/icons/accessibility/accessibility-128x128_2x.png" alt="Accessibility" width="64" height="64" />
        </button>
      </div>
      {isOpen && (
        <div className={`fixed bottom-24 right-4 z-50 bg-white dark:bg-gray-800 shadow-md p-4 rounded-md`}>
          <ul>
            <li className="flex items-center mb-2">
              <button className={`text-lg font-bold px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md`} onClick={handleDecreaseTextSize}>-</button>
              <span className="mx-2">Text Size</span>
              <button className={`text-lg font-bold px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md`} onClick={handleIncreaseTextSize}>+</button>
            </li>
            <li className="flex items-center mb-2">
              <span className="mr-2">High Contrast</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={handleToggleHighContrast}
                  className="hidden"
                />
                <div className={`toggle-switch-toggle relative ml-0.5 w-7 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner`}>
                  <div className={`toggle-path absolute w-4 h-4 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition ${highContrast ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </li>
            <li className="flex items-center">
              <span className="mr-2">Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="hidden"
                />
                <div className={`toggle-switch-toggle relative ml-5 w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner`}>
                  <div className={`toggle-path absolute w-4 h-4 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AccessibilityMenu;
