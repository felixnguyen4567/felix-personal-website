'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import ThemeToggle from '@/components/theme-toggle';

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Close mobile menu on route change or resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border-light">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-lg font-bold tracking-tight text-primary dark:text-foreground">
                            FELIX NG
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="nav-link" href="/projects">Projects</Link>
                        <Link className="nav-link" href="/journal">Journal</Link>
                        <Link className="nav-link" href="/ai-news">AI News</Link>
                        <Link className="nav-link" href="/about">About</Link>
                        <ThemeToggle />
                        <Link href="/contact" className="ml-2 border border-primary text-primary hover:bg-primary hover:text-white dark:border-border-light dark:text-foreground dark:hover:bg-foreground dark:hover:text-background px-5 py-2 rounded text-sm font-medium transition-all">
                            Contact
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border-light hover:bg-secondary transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            <span className={`material-symbols-outlined text-xl text-text-main transition-all duration-200 ${mobileOpen ? 'rotate-90 opacity-0 scale-0' : 'rotate-0 opacity-100 scale-100'} absolute`}>menu</span>
                            <span className={`material-symbols-outlined text-xl text-text-main transition-all duration-200 ${mobileOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'} absolute`}>close</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile sidebar overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile sidebar */}
            <div className={`fixed top-0 right-0 z-50 h-full w-72 bg-background border-l border-border-light shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-24 px-8">
                    <div className="flex flex-col gap-2">
                        {[
                            { href: '/projects' as const, label: 'Projects', icon: 'work' },
                            { href: '/journal' as const, label: 'Journal', icon: 'book' },
                            { href: '/ai-news' as const, label: 'AI News', icon: 'smart_toy' },
                            { href: '/about' as const, label: 'About', icon: 'person' },
                            { href: '/contact' as const, label: 'Contact', icon: 'mail' },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-text-main hover:bg-secondary transition-colors text-base font-medium"
                            >
                                <span className="material-symbols-outlined text-xl text-muted-foreground">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pb-12 pt-8 border-t border-border-light">
                        <p className="text-xs text-muted-foreground text-center">© 2024 Felix Ng</p>
                    </div>
                </div>
            </div>
        </>
    );
}
