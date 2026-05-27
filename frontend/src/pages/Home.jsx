import { motion } from 'framer-motion';
import { Coffee, Truck, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BookingForm from '../components/booking/BookingForm.jsx';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 },
};

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Desktop Hero — hidden on mobile */}
      <section className="hidden md:block relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-950" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-coffee-400 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-caramel-500 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm mb-8">
              <Coffee className="w-4 h-4" />
              Drift Coffee
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
              {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-coffee-200/80 max-w-2xl mx-auto mb-10">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mobile compact header */}
      <section className="md:hidden relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-950" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-coffee-400 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-caramel-500 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 px-4 py-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] mb-3">
            <Coffee className="w-3 h-3" />
            Drift Coffee
          </div>
          <h1 className="text-xl font-black text-white leading-tight mb-2">
            {t('hero.title')}
          </h1>
          <p className="text-xs text-coffee-200/80 max-w-xs mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Booking Form — first on mobile, scroll-to on desktop */}
      <section
        className="py-6 md:py-20 bg-gradient-to-b from-coffee-50 to-white dark:from-coffee-950 dark:to-coffee-900"
        id="booking"
      >
        <div className="max-w-7xl mx-auto px-4">
          <BookingForm />
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-24 bg-coffee-50 dark:bg-coffee-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-8 md:mb-16">
            <h2 className="text-xl md:text-5xl font-black text-coffee-900 dark:text-white mb-2 md:mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xs md:text-lg text-coffee-500 dark:text-coffee-400 max-w-xl mx-auto">
              {t('features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Coffee, titleKey: 'premium', delay: 0 },
              { icon: Truck, titleKey: 'flexible', delay: 0.1 },
              { icon: Award, titleKey: 'elegant', delay: 0.2 },
            ].map((feature) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                className="card-hover p-4 md:p-8 text-center group"
              >
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center mx-auto mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 md:w-8 md:h-8 text-coffee-600 dark:text-coffee-400" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-coffee-900 dark:text-white mb-1 md:mb-3">
                  {t(`features.${feature.titleKey}.title`)}
                </h3>
                <p className="text-[11px] md:text-base text-coffee-500 dark:text-coffee-400 leading-relaxed">
                  {t(`features.${feature.titleKey}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}