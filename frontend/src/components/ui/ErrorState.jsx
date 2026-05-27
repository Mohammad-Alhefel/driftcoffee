import { motion } from 'framer-motion';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ErrorState({ message, onRetry }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-coffee-700 dark:text-coffee-300 mb-2">{t('dashboard.error')}</h3>
      <p className="text-coffee-500 dark:text-coffee-400 mb-6 text-center">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          {t('dashboard.tryAgain')}
        </button>
      )}
    </motion.div>
  );
}
