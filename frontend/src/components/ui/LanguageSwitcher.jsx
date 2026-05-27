import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleLang}
      className="btn-ghost flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold"
    >
      <Languages className="w-4 h-4" />
      {i18n.language === 'ar' ? 'EN' : 'AR'}
    </motion.button>
  );
}
