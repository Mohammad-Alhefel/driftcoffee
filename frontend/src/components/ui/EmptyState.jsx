import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export default function EmptyState({ title, description, icon: Icon = Coffee }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 rounded-full bg-coffee-100 dark:bg-coffee-800 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-coffee-400 dark:text-coffee-500" />
      </div>
      <h3 className="text-xl font-bold text-coffee-700 dark:text-coffee-300 mb-2">{title}</h3>
      <p className="text-coffee-500 dark:text-coffee-400 text-center max-w-md">{description}</p>
    </motion.div>
  );
}
