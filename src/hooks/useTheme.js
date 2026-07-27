// ═══════════════════════════════════════════════════════════════
//  useTheme — Theme state management with localStorage
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useCallback } from 'react';
import { animateThemeTransition, THEMES } from '../animations/theme.js';

const THEME_KEY = 'portfolio-theme';
const themeNames = Object.keys(THEMES);

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    // Apply theme on mount
    const root = document.documentElement;
    const themeVars = THEMES[theme];
    if (themeVars) {
      Object.entries(themeVars).forEach(([prop, value]) => {
        root.style.setProperty(prop, value);
      });
    }
    root.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const currentIndex = themeNames.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    const nextTheme = themeNames[nextIndex];

    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    animateThemeTransition(nextTheme);

    try {
      localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  return { theme, toggleTheme, themeNames };
}

export default useTheme;
