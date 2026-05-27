import { motion } from 'framer-motion';

export default function StatsCard({ title, value, icon: Icon, color = 'coffee' }) {
  const colors = {
    total: 'from-coffee-800 to-coffee-950',
    new: 'from-caramel-500 to-coffee-700',
    completed: 'from-mocha-500 to-coffee-800',
    cancelled: 'from-coffee-500 to-coffee-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 sm:p-6 flex items-center gap-3 sm:gap-5"
    >
      <div
        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors[color] || colors.coffee} flex items-center justify-center shadow-lg shrink-0`}
      >
        <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-coffee-500 dark:text-coffee-400 font-medium truncate">{title}</p>
        <p className="text-xl sm:text-2xl md:text-3xl font-black text-coffee-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </motion.div>
  );
}
