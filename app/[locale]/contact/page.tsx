import { setRequestLocale } from 'next-intl/server';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="pt-32 pb-24 px-4 sm:px-8 max-w-4xl mx-auto">
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-bold tracking-tight mb-6 text-text-main">Get in Touch</h1>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
                    Have a project in mind or just want to say hello? I&apos;d love to hear from you.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Email</h3>
                        <a href="mailto:felix.nguyen410@gmail.com" className="text-xl text-text-main hover:text-primary transition-colors">
                            felix.nguyen410@gmail.com
                        </a>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Writing & Long-form</h3>
                        <a href="https://medium.com/@felixnguyen_3460" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            Medium
                        </a>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Social & Community</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://www.facebook.com/felixnguyenai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                Facebook
                            </a>
                            <a href="https://www.instagram.com/felixnguyenai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                Instagram
                            </a>
                            <a href="https://www.tiktok.com/@felixaustralia" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                TikTok
                            </a>
                            <a href="https://x.com/junevnn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                X (Twitter)
                            </a>
                            <a href="https://www.linkedin.com/in/felix-nguyen-5a7303174/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-text-main">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-text-main focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-text-main">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-text-main focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-text-main">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-border-light bg-background text-text-main focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                            placeholder="Tell me about your project..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
