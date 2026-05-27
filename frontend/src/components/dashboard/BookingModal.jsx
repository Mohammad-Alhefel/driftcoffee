import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, User, Coffee, Heart, FileText, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function BookingModal({ booking, onClose }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  if (!booking) return null;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    contacting: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="card w-full sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-b-none sm:rounded-b-2xl"
        >
          <div className="sticky top-0 bg-white dark:bg-coffee-900 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-coffee-100 dark:border-coffee-800">
            <h3 className="text-lg sm:text-xl font-black text-coffee-900 dark:text-white">{t('dashboard.view')}</h3>
            <button onClick={onClose} className="btn-ghost p-1.5">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.fullName')}</p>
                <p className="text-sm sm:text-base font-bold text-coffee-900 dark:text-white truncate">{booking.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.phone')}</p>
                <p className="text-sm sm:text-base font-bold text-coffee-900 dark:text-white" dir="ltr">
                  {booking.countryCode} {booking.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.location')}</p>
                <p className="text-sm sm:text-base font-bold text-coffee-900 dark:text-white truncate">
                  {booking.city} - {booking.eventCountry}
                </p>
                {booking.location?.latitude && (
                  <p className="text-[10px] sm:text-xs text-coffee-400 font-mono">
                    {booking.location.latitude.toFixed(4)}, {booking.location.longitude?.toFixed(4)}
                  </p>
                )}
              </div>
            </div>

            {booking.location?.latitude && booking.location?.longitude && (
              <div className="h-32 sm:h-40 rounded-xl overflow-hidden border border-coffee-200 dark:border-coffee-700 relative z-0">
                <MapContainer
                  center={[booking.location.latitude, booking.location.longitude]}
                  zoom={13}
                  className="h-full w-full"
                  zoomControl={false}
                  dragging={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[booking.location.latitude, booking.location.longitude]} />
                </MapContainer>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.cupsCount')}</p>
                <p className="text-sm sm:text-base font-bold text-coffee-900 dark:text-white">{booking.cupsCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.sweetOption')}</p>
                <p className="text-sm sm:text-base font-bold text-coffee-900 dark:text-white">
                  {booking.sweetOption ? t('booking.yes') : t('booking.no')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.eventType')}</p>
                <p className="text-sm sm:text-base font-bold text-coffee-900 dark:text-white">
                  {t(`booking.eventTypes.${booking.eventType}`)}
                </p>
              </div>
            </div>

            {booking.notes && (
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-coffee-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-coffee-400">{t('booking.notes')}</p>
                  <p className="text-xs sm:text-sm text-coffee-700 dark:text-coffee-300 break-words">{booking.notes}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-coffee-100 dark:border-coffee-800">
              <span className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold ${statusColors[booking.status]}`}>
                {t(`dashboard.${booking.status}`)}
              </span>
              <span className="text-[10px] sm:text-xs text-coffee-400">{formatDate(booking.createdAt)}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}