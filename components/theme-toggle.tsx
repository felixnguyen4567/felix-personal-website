'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = saved === 'dark' || (!saved && prefersDark);
        setDark(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    const toggle = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={toggle}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border-light hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
        >
            <span className={`material-symbols-outlined text-lg transition-all duration-300 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} absolute`}>
                dark_mode
            </span>
            <span className={`material-symbols-outlined text-lg transition-all duration-300 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} absolute`}>
                light_mode
            </span>
        </button>
    );
}
