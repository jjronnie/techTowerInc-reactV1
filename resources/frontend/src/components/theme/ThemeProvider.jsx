import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeProviderContext = createContext(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'techtower-theme',
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey);
      return storedTheme || defaultTheme;
    } catch (e) {
      console.error("Failed to read theme from localStorage", e);
      return defaultTheme;
    }
  });

  const applyTheme = useCallback((currentTheme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let effectiveTheme = currentTheme;
    if (currentTheme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    root.classList.add(effectiveTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);


  const value = {
    theme,
    setTheme: (newTheme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch (e) {
        console.error("Failed to save theme to localStorage", e);
      }
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};