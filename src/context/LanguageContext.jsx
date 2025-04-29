import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [isEnglish, setIsEnglish] = useState(
    () => localStorage.getItem('isEnglish') === 'true' 
  );

  useEffect(() => {
    localStorage.setItem('isEnglish', isEnglish);
  }, [isEnglish]);

  const toggleToEnglish = () => setIsEnglish(true);
  const toggleToArabic = () => setIsEnglish(false);

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleToEnglish, toggleToArabic }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}