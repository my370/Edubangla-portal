import { createContext, useState } from "react";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {

  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(
      language === "en" ? "bn" : "en"
    );
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
} 

