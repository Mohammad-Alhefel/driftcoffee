import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, LogOut, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';

export default function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    ...(isAuthenticated ? [{ to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard }] : []),
    ...(!isAuthenticated ? [{ to: '/login', label: t('nav.login') }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-coffee-100 dark:border-coffee-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-coffee-800 dark:bg-coffee-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-coffee-900 dark:text-white">
              Drift <span className="text-coffee-500">Coffee</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`btn-ghost flex items-center gap-1.5 ${
                  location.pathname === link.to
                    ? 'bg-coffee-100 dark:bg-coffee-800 text-coffee-900 dark:text-white'
                    : ''
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {isAuthenticated && (
              <button onClick={handleLogout} className="btn-ghost flex items-center gap-1.5">
                <LogOut className="w-4 h-4" />
                {t('nav.logout')}
              </button>
            )}
            <div className="h-6 w-px bg-coffee-200 dark:bg-coffee-700 mx-2" />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden btn-ghost p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-coffee-100 dark:border-coffee-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`btn-ghost w-full flex items-center gap-2 ${
                    location.pathname === link.to ? 'bg-coffee-100 dark:bg-coffee-800' : ''
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <button onClick={handleLogout} className="btn-ghost w-full flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  {t('nav.logout')}
                </button>
              )}
              <div className="flex items-center gap-2 pt-2 border-t border-coffee-100 dark:border-coffee-800">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
