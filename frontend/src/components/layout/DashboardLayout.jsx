import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Coffee, BarChart3, ListOrdered, LogOut, Home, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext.jsx';
import ThemeToggle from '../ui/ThemeToggle.jsx';
import LanguageSwitcher from '../ui/LanguageSwitcher.jsx';

const sidebarLinks = [
  { to: '/dashboard', labelKey: 'nav.stats', icon: BarChart3 },
  { to: '/dashboard/orders', labelKey: 'nav.orders', icon: ListOrdered },
];

export default function DashboardLayout({ title, children }) {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-coffee-900 border-l border-coffee-100 dark:border-coffee-800 flex flex-col shadow-xl md:shadow-none transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        } md:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between p-4 border-b border-coffee-100 dark:border-coffee-800">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-coffee-800 dark:bg-coffee-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-black tracking-tight text-coffee-900 dark:text-white">
              Drift <span className="text-coffee-500">Coffee</span>
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden btn-ghost p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-1">
          {/* Back to Home — prominent */}
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-coffee-500 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-coffee-800/50 hover:text-coffee-700 dark:hover:text-coffee-200 transition-all mb-2"
          >
            <Home className="w-4 h-4 shrink-0" />
            {t('nav.home')}
          </Link>

          <div className="border-t border-coffee-100 dark:border-coffee-800 pt-2">
            <p className="px-3 pb-1 text-[10px] font-bold text-coffee-400 dark:text-coffee-500 uppercase tracking-wider">
              {t('nav.dashboard')}
            </p>
            {sidebarLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.to)
                    ? 'bg-coffee-100 dark:bg-coffee-800 text-coffee-900 dark:text-white'
                    : 'text-coffee-500 dark:text-coffee-400 hover:bg-coffee-50 dark:hover:bg-coffee-800/50 hover:text-coffee-700 dark:hover:text-coffee-200'
                }`}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-coffee-100 dark:border-coffee-800 space-y-2">
          <div className="flex items-center justify-between px-3 py-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {t('nav.logout')}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-coffee-900/80 backdrop-blur-md border-b border-coffee-100 dark:border-coffee-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden btn-ghost p-1.5">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg md:text-2xl font-black text-coffee-900 dark:text-white truncate">
              {title}
            </h1>
          </div>
        </div>

        {/* Page content */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}