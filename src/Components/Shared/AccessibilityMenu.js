import React, { useState } from 'react';
import { useTheme } from '@/components/Shared/ThemeContext';
import AccessibilityBtnImg from '@/assets/Images/accessibility_btn_image.png';
import Image from 'next/image';

const AccessibilityMenu = () => {
  const { toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className="fixed bottom-3 right-4 z-50">
        <button
          className="dark:bg-gray-800 text-white rounded-full p-2 shadow-md"
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '64px', height: '64px', borderRadius: '50%' }}
        >
          <Image src={AccessibilityBtnImg} alt="Accessibility" width="64" height="64" className="rounded-full" />
        </button>
      </div>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 dark:bg-gray-800 dark:text-white shadow-md p-4 rounded-md">
          <ul>
            <li className="flex items-center mb-2">
              <button
                className="dark:bg-gray-500 text-lg font-bold px-3 py-1 rounded-md"
                onClick={handleDecreaseTextSize}
              >
                -
              </button>
              <span className="mx-2">Text Size</span>
              <button
                className="dark:bg-gray-500 text-lg font-bold px-3 py-1 rounded-md"
                onClick={handleIncreaseTextSize}
              >
                +
              </button>
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
                <div className="toggle-switch-toggle relative ml-0.5 w-7 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner">
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
                  onChange={handleToggleDarkMode}
                  className="hidden"
                />
                <div className="toggle-switch-toggle relative ml-5 w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner">
                  <div className="toggle-path absolute w-4 h-4 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition translate-x-0"></div>
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
