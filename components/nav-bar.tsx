import { Link } from '@/i18n/routing';

export default function NavBar() {

    return (
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
                    <Link href="/contact" className="ml-4 border border-primary text-primary hover:bg-primary hover:text-white dark:border-border-light dark:text-foreground dark:hover:bg-foreground dark:hover:text-background px-5 py-2 rounded text-sm font-medium transition-all">
                        Contact
                    </Link>
                </div>
                <div className="md:hidden">
                    <span className="material-symbols-outlined text-text-main cursor-pointer">menu</span>
                </div>
            </div>
        </nav>
    );
}
