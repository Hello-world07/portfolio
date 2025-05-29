import React, { createContext, useState, useEffect } from 'react';

// Create a Theme Context for managing light/dark/system modes
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    console.log('Initial theme from localStorage:', savedTheme || 'light'); // Debug log
    return savedTheme || 'light';
  });

  // Apply the theme by adding/removing the 'dark' class on <html>
  useEffect(() => {
    console.log('Current theme state:', theme); // Debug log
    const htmlElement = document.documentElement;
    if (theme === 'dark') {
      console.log('Adding dark class to <html>'); // Debug log
      htmlElement.classList.add('dark');
    } else {
      console.log('Removing dark class from <html>'); // Debug log
      htmlElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    console.log('Saved theme to localStorage:', theme); // Debug log
  }, [theme]);

  // Handle system theme changes when theme is set to 'system'
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      if (theme === 'system') {
        const newTheme = e.matches ? 'dark' : 'light';
        console.log('System theme changed to:', newTheme); // Debug log
        setTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme]);

  // Function to change the theme
  const changeTheme = (newTheme) => {
    console.log('Changing theme to:', newTheme); // Debug log
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      console.log('System preference detected:', systemTheme); // Debug log
      setTheme(systemTheme);
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };