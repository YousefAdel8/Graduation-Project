import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('isDark') === 'true' 
  );

  useEffect(() => {
    localStorage.setItem('isDark', isDark);
  }, [isDark]);

  const toggleToDark = () => setIsDark(true);
  const toggleToLight = () => setIsDark(false);

  return (
    <ThemeContext.Provider value={{ isDark, toggleToDark, toggleToLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}