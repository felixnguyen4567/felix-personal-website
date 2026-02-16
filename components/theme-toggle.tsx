'use client';

import { useEffect, useState, useCallback } from 'react';

type ThemeMode = 'auto' | 'light' | 'dark';

function isDaytime(): boolean {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
}

function resolveTheme(mode: ThemeMode): boolean {
    if (mode === 'light') return false;
    if (mode === 'dark') return true;
    return !isDaytime(); // auto: dark at night
}

export default function ThemeToggle() {
    const [mode, setMode] = useState<ThemeMode>('auto');
    const [mounted, setMounted] = useState(false);

    const applyTheme = useCallback((m: ThemeMode) => {
        const isDark = resolveTheme(m);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    // Initialize from localStorage
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme') as ThemeMode | null;
        const initial: ThemeMode = saved === 'light' || saved === 'dark' ? saved : 'auto';
        setMode(initial);
        applyTheme(initial);
    }, [applyTheme]);

    // Auto-mode: re-check every 60s so theme transitions live at sunrise/sunset
    useEffect(() => {
        if (mode !== 'auto') return;
        const interval = setInterval(() => applyTheme('auto'), 60_000);
        return () => clearInterval(interval);
    }, [mode, applyTheme]);

    const cycle = () => {
        const order: ThemeMode[] = ['auto', 'light', 'dark'];
        const next = order[(order.indexOf(mode) + 1) % order.length];
        setMode(next);
        applyTheme(next);
        localStorage.setItem('theme', next);
    };

    if (!mounted) return <div className="w-9 h-9" />;

    const icons: Record<ThemeMode, string> = {
        auto: 'routine',
        light: 'light_mode',
        dark: 'dark_mode',
    };

    const labels: Record<ThemeMode, string> = {
        auto: 'Auto theme (time-based)',
        light: 'Light mode',
        dark: 'Dark mode',
    };

    return (
        <button
            onClick={cycle}
            className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border-light hover:bg-secondary transition-colors"
            aria-label={labels[mode]}
            title={labels[mode]}
        >
            {(['auto', 'light', 'dark'] as ThemeMode[]).map((m) => (
                <span
                    key={m}
                    className={`material-symbols-outlined text-lg transition-all duration-300 absolute ${mode === m
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-0'
                        }`}
                >
                    {icons[m]}
                </span>
            ))}
        </button>
    );
}
