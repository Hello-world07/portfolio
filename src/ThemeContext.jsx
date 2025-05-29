import React, { createContext, useState, useEffect } from 'react';

// Create a Theme Context for managing light/dark/system modes
const ThemeContext = createContext();

// Function to apply the theme immediately (used in useEffect)
const applyTheme = (theme) => {
  const htmlElement = document.documentElement;
  if (theme === 'dark') {
    console.log('Adding dark class to <html>'); // Debug log
    htmlElement.classList.add('dark');
  } else {
    console.log('Removing dark class from <html>'); // Debug log
    htmlElement.classList.remove('dark');
  }
};

const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    // Only access localStorage on the client
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      console.log('Initial theme from localStorage:', savedTheme || 'light'); // Debug log
      return savedTheme || 'light';
    }
    return 'light'; // Default for server-side rendering
  });

  // Apply the theme on initial render and when theme changes
  useEffect(() => {
    console.log('Current theme state:', theme); // Debug log
    applyTheme(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      console.log('Saved theme आणिto localStorage:', theme); // Debug log
    }
  }, [theme]);

  // Apply the theme immediately on page load (before React fully hydrates)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      console.log('Applying initial theme before React fully renders:', savedTheme); // Debug log
      applyTheme(savedTheme);
    }
  }, []); // Run once on mount

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
    return () => mediaQuery.removeEventListener('change', handleSystemChange); // Fixed typo
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