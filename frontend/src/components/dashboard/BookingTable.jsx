import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { countries } from '../ui/CountrySelect.jsx';
import EmptyState from '../ui/EmptyState.jsx';
import ErrorState from '../ui/ErrorState.jsx';
import { SkeletonTable } from '../ui/SkeletonLoader.jsx';

const statuses = ['new', 'contacting', 'completed', 'cancelled'];
const statusColors = {
  new: 'badge-new',
  contacting: 'badge-contacting',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
};

export default function BookingTable({
  bookings,
  loading,
  error,
  onRetry,
  filters,
  onFilterChange,
  onView,
  onDelete,
  onStatusChange,
}) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCountryFlag = (code) => {
    const c = countries.find((c) => c.code === code);
    return c ? c.flag : code;
  };

  if (loading) return <SkeletonTable rows={6} />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (bookings.length === 0)
    return <EmptyState title={t('dashboard.noBookings')} description={t('dashboard.noBookingsDesc')} />;

  return (
    <div className="card overflow-hidden">
      <div className="p-3 sm:p-4 border-b border-coffee-100 dark:border-coffee-800">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          <div className="relative flex-1 min-w-[140px] sm:min-w-[200px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-coffee-400" />
            <input
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder={t('dashboard.search')}
              className="input-field pl-4 pr-9 py-1.5 sm:py-2 text-xs sm:text-sm"
            />
          </div>
          <select
            value={filters.country || ''}
            onChange={(e) => onFilterChange({ ...filters, country: e.target.value })}
            className="input-field py-1.5 sm:py-2 text-xs sm:text-sm w-32 sm:w-40"
          >
            <option value="">{t('dashboard.allCountries')}</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {isAr ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="input-field py-1.5 sm:py-2 text-xs sm:text-sm w-28 sm:w-40"
          >
            <option value="">{t('dashboard.allStatuses')}</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {t(`dashboard.${s}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="sm:hidden divide-y divide-coffee-100 dark:divide-coffee-800">
        <AnimatePresence>
          {bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="p-3 space-y-2 hover:bg-coffee-50/50 dark:hover:bg-coffee-900/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-coffee-900 dark:text-coffee-100 truncate">{booking.fullName}</p>
                  <p className="text-xs text-coffee-500 dark:text-coffee-400" dir="ltr">
                    {booking.countryCode} {booking.phone}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => onView(booking)} className="btn-ghost p-1" title={t('dashboard.view')}>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(booking._id)}
                    className="btn-ghost p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    title={t('dashboard.delete')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-coffee-600 dark:text-coffee-400 truncate">
                  {getCountryFlag(booking.eventCountry)} {booking.city}
                </span>
                <select
                  value={booking.status}
                  onChange={(e) => onStatusChange?.(booking._id, e.target.value)}
                  className={`${statusColors[booking.status]} border-0 bg-transparent cursor-pointer text-xs font-bold px-1.5 py-0.5 rounded-full`}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {t(`dashboard.${s}`)}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-coffee-400 dark:text-coffee-500">{formatDate(booking.createdAt)}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-coffee-100 dark:border-coffee-800 bg-coffee-50/50 dark:bg-coffee-900/50">
              <th className="text-right px-3 py-2.5 text-[10px] sm:text-xs font-bold text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                {t('booking.fullName')}
              </th>
              <th className="text-right px-3 py-2.5 text-[10px] sm:text-xs font-bold text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                {t('booking.phone')}
              </th>
              <th className="text-right px-3 py-2.5 text-[10px] sm:text-xs font-bold text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                {t('booking.eventCountry')}
              </th>
              <th className="text-right px-3 py-2.5 text-[10px] sm:text-xs font-bold text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                {isAr ? 'الحالة' : 'Status'}
              </th>
              <th className="text-right px-3 py-2.5 text-[10px] sm:text-xs font-bold text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                {isAr ? 'التاريخ' : 'Date'}
              </th>
              <th className="text-left px-3 py-2.5 text-[10px] sm:text-xs font-bold text-coffee-500 dark:text-coffee-400 uppercase tracking-wider">
                {t('dashboard.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-coffee-100 dark:divide-coffee-800">
            <AnimatePresence>
              {bookings.map((booking, i) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-coffee-50/50 dark:hover:bg-coffee-900/30 transition-colors"
                >
                  <td className="px-3 py-2.5 text-xs sm:text-sm font-bold text-coffee-900 dark:text-coffee-100">
                    {booking.fullName}
                  </td>
                  <td className="px-3 py-2.5 text-xs sm:text-sm text-coffee-600 dark:text-coffee-400" dir="ltr">
                    {booking.countryCode} {booking.phone}
                  </td>
                  <td className="px-3 py-2.5 text-xs sm:text-sm text-coffee-600 dark:text-coffee-400">
                    {getCountryFlag(booking.eventCountry)} {booking.city}
                  </td>
                  <td className="px-3 py-2.5">
                    <select
                      value={booking.status}
                      onChange={(e) => onStatusChange?.(booking._id, e.target.value)}
                      className={`${statusColors[booking.status]} border-0 bg-transparent cursor-pointer text-[10px] sm:text-xs font-bold`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {t(`dashboard.${s}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2.5 text-[10px] sm:text-xs text-coffee-500 dark:text-coffee-400 whitespace-nowrap">
                    {formatDate(booking.createdAt)}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onView(booking)} className="btn-ghost p-1.5" title={t('dashboard.view')}>
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(booking._id)}
                        className="btn-ghost p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title={t('dashboard.delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}