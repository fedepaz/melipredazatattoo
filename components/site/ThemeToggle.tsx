'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force direct storage access if next-themes gets stuck
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, [setTheme]);

  if (!mounted) return <div className="p-2 w-9 h-9" />;

  const currentTheme = resolvedTheme || theme;

  return (
    <button
      onClick={() => {
        const next = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        // Direct DOM manipulation as a fallback for Tailwind v4 theme mapping issues
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(next);
        document.documentElement.setAttribute('data-theme', next);
      }}
      className="p-2 text-mist hover:text-gold transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-smoke/10"
      aria-label="Alternar tema"
    >
      {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
