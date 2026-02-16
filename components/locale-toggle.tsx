'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LocaleToggle() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: 'en' | 'vi') => {
        if (newLocale === locale) return;
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center h-9 rounded-lg border border-border-light overflow-hidden text-xs font-medium">
            <button
                onClick={() => switchLocale('en')}
                className={`px-2.5 h-full transition-colors ${locale === 'en'
                        ? 'bg-primary text-white dark:bg-foreground dark:text-background'
                        : 'text-muted-foreground hover:text-text-main hover:bg-secondary'
                    }`}
                aria-label="Switch to English"
            >
                EN
            </button>
            <button
                onClick={() => switchLocale('vi')}
                className={`px-2.5 h-full transition-colors ${locale === 'vi'
                        ? 'bg-primary text-white dark:bg-foreground dark:text-background'
                        : 'text-muted-foreground hover:text-text-main hover:bg-secondary'
                    }`}
                aria-label="Chuyển sang Tiếng Việt"
            >
                VI
            </button>
        </div>
    );
}
