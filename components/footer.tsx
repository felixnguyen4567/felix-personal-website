
export default function Footer() {
    return (
        <footer className="py-16 px-6 border-t border-border-light bg-slate-50/30 dark:bg-background/30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                    <span className="text-xs font-bold text-primary tracking-widest">PORTFOLIO</span>
                    <p className="text-text-muted text-[11px] font-medium uppercase tracking-wider">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
                <div className="flex items-center gap-8">
                    <a className="text-text-muted hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">alternate_email</span></a>
                    <a className="text-text-muted hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">data_object</span></a>
                    <a className="text-text-muted hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined text-xl">share</span></a>
                </div>
                <div className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">
                    Simplicity is the ultimate sophistication
                </div>
            </div>
        </footer>
    );
}
