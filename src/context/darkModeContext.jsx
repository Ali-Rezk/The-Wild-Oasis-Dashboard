import { createContext, useContext, useEffect, useState } from "react";

const darkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem("darkMode");

    if (storedPreference !== null) return JSON.parse(storedPreference);

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <darkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(darkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
