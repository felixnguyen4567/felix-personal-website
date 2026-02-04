import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function NavBar() {
    const t = useTranslations('Nav');

    return (
        <nav className="flex items-center justify-between p-4 max-w-5xl mx-auto w-full">
            <Link href="/" className="font-bold text-xl tracking-tight">
                Felix Ng.
            </Link>
            <div className="flex gap-6 text-sm font-medium text-gray-600">
                <Link href="/logs" className="hover:text-black transition-colors">{t('logs')}</Link>
                <Link href="/notes" className="hover:text-black transition-colors">{t('notes')}</Link>
                <Link href="/systems" className="hover:text-black transition-colors">{t('systems')}</Link>
                <Link href="/projects" className="hover:text-black transition-colors">{t('projects')}</Link>
                <Link href="/about" className="hover:text-black transition-colors">{t('about')}</Link>
            </div>
        </nav>
    );
}
