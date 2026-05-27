import { Coffee } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="glass border-t border-coffee-100 dark:border-coffee-800/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coffee className="w-5 h-5 text-coffee-500" />
            <span className="font-bold text-coffee-700 dark:text-coffee-300">
              Drift Coffee
            </span>
          </div>
          <p className="text-sm text-coffee-500 dark:text-coffee-400">
            &copy; {new Date().getFullYear()} Drift Coffee. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
