import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
