
import React, { useEffect, useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Moon, Sun } from 'lucide-react';
import { setCookie, getCookie } from '@/utils/cookieUtils';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Initialize theme from cookie or system preference
  useEffect(() => {
    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setCookie('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setCookie('theme', 'dark');
      setIsDarkMode(true);
    }
  };
  
  return (
    <Toggle 
      pressed={isDarkMode}
      onPressedChange={toggleTheme}
      aria-label="Toggle dark mode"
      className="rounded-full p-2 hover:bg-muted"
    >
      {isDarkMode ? (
        <Moon size={18} className="text-white" />
      ) : (
        <Sun size={18} />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
