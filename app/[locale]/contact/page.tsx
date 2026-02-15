import { setRequestLocale } from 'next-intl/server';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-5xl mx-auto">
            <header className="mb-16 pb-12 border-b border-border-light">
                <h1 className="text-5xl font-bold tracking-tight mb-4 text-text-main">Get in Touch</h1>
                <p className="text-muted-foreground text-xl max-w-2xl font-light">
                    Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-10">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">mail</span>
                            Email
                        </h3>
                        <a href="mailto:felix.nguyen410@gmail.com" className="text-lg text-text-main hover:text-primary transition-colors font-medium">
                            felix.nguyen410@gmail.com
                        </a>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">edit_note</span>
                            Writing & Long-form
                        </h3>
                        <a href="https://medium.com/@felixnguyen_3460" target="_blank" rel="noopener noreferrer" className="text-text-main hover:text-primary transition-colors flex items-center gap-2 font-medium">
                            Medium
                            <span className="material-symbols-outlined text-sm text-muted-foreground">open_in_new</span>
                        </a>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-base">group</span>
                            Social & Community
                        </h3>
                        <div className="flex flex-col gap-3">
                            {[
                                { name: 'Facebook', href: 'https://www.facebook.com/felixnguyenai' },
                                { name: 'Instagram', href: 'https://www.instagram.com/felixnguyenai/' },
                                { name: 'TikTok', href: 'https://www.tiktok.com/@felixaustralia' },
                                { name: 'X (Twitter)', href: 'https://x.com/junevnn' },
                                { name: 'LinkedIn', href: 'https://www.linkedin.com/in/felix-nguyen-5a7303174/' },
                            ].map((social) => (
                                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                                    className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 text-sm">
                                    <span className="material-symbols-outlined text-base">arrow_outward</span>
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-border-light p-8">
                    <h3 className="text-xl font-semibold text-text-main mb-6">Send a Message</h3>
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-text-main">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-text-main focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-text-main">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-text-main focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-text-main">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-text-main focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
