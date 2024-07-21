import React, { useState } from 'react';
import { useTheme } from '@/components/Shared/ThemeContext';
import AccessibilityBtnImg from '@/assets/Images/accessibility_btn_image.png';
import Image from 'next/image';

const AccessibilityMenu = () => {
  const { toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isTextLarge, setIsTextLarge] = useState(false);

  const handleToggleTextSize = () => {
    const root = document.documentElement;
    if (isTextLarge) {
      root.style.fontSize = ''; // Reset to default
    } else {
      root.style.fontSize = '1.25em'; // Increase by 25%
    }
    setIsTextLarge(!isTextLarge);
  };

  return (
    <>
      <div className="fixed bottom-3 right-4 z-50">
        <button
          className={`dark:bg-gray-800 dark:text-white bg-white text-black rounded-full p-2 shadow-md`}
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: '64px', height: '64px', borderRadius: '50%' }}
        >
          <Image src={AccessibilityBtnImg} alt="Accessibility" width="64" height="64" className="rounded-full" />
        </button>
      </div>
      {isOpen && (
        <div className={`fixed bottom-24 right-4 z-50 dark:bg-gray-800 dark:text-white bg-white text-black shadow-md p-4 rounded-md`}>
          <ul>
            <li className="flex items-center mb-2">
              <span className="mr-2">Zoom In</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isTextLarge}
                  onChange={handleToggleTextSize}
                  className="hidden"
                />
                <div className="toggle-switch-toggle relative ml-10 w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner">
                  <div className={`toggle-path absolute w-4 h-4 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition ${isTextLarge ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </label>
            </li>
            <li className="flex items-center">
              <span className="mr-2">Dark Mode</span>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={toggleDarkMode}
                  className="hidden"
                />
                <div className="toggle-switch-toggle relative ml-5 w-8 h-4 bg-gray-400 dark:bg-gray-600 rounded-full shadow-inner">
                  <div className='toggle-path absolute w-4 h-4 bg-white dark:bg-gray-300 rounded-full shadow-md transform transition dark:translate-x-4 dark:translate-x-0'></div>
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
