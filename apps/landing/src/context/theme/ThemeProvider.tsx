import { useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Load initial theme from localStorage or system preference
  useEffect(() => {
    const initTheme = () => {
      const saved = localStorage.getItem('theme') as Theme | null;
      if (saved) {
        setTheme(saved);
        document.documentElement.classList.toggle('dark', saved === 'dark');
      } else {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;
        setTheme(prefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', prefersDark);
      }
    };
    initTheme();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
