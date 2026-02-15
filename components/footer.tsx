import { Link } from '@/i18n/routing';

export default function Footer() {
    return (
        <footer className="py-16 px-6 border-t border-border-light">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="text-lg font-bold tracking-tight text-primary dark:text-foreground mb-4 block">FELIX NG</Link>
                        <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                            Designing interfaces that bridge human intelligence and technology.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        <Link href="/projects" className="text-sm text-text-muted hover:text-primary transition-colors">Projects</Link>
                        <Link href="/journal" className="text-sm text-text-muted hover:text-primary transition-colors">Journal</Link>
                        <Link href="/ai-news" className="text-sm text-text-muted hover:text-primary transition-colors">AI News</Link>
                        <Link href="/about" className="text-sm text-text-muted hover:text-primary transition-colors">About</Link>
                        <Link href="/contact" className="text-sm text-text-muted hover:text-primary transition-colors">Contact</Link>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.15em] mb-1">Connect</span>
                        <div className="flex items-center gap-5">
                            <a className="text-text-muted hover:text-primary transition-colors" href="mailto:felix.nguyen410@gmail.com" aria-label="Email">
                                <span className="material-symbols-outlined text-xl">mail</span>
                            </a>
                            <a className="text-text-muted hover:text-primary transition-colors" href="https://github.com/felixnguyen4567" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <span className="material-symbols-outlined text-xl">code</span>
                            </a>
                            <a className="text-text-muted hover:text-primary transition-colors" href="https://www.linkedin.com/in/felix-nguyen-5a7303174/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </a>
                            <a className="text-text-muted hover:text-primary transition-colors" href="https://www.facebook.com/felixnguyenai" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <span className="material-symbols-outlined text-xl">group</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-light flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-text-muted text-xs font-medium">
                        © {new Date().getFullYear()} Felix Ng. All rights reserved.
                    </p>
                    <p className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
                        Simplicity is the ultimate sophistication
                    </p>
                </div>
            </div>
        </footer>
    );
}
