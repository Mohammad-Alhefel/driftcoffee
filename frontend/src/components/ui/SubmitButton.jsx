import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function SubmitButton({ text, loading, success, disabled }) {
  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      type="submit"
      disabled={disabled || loading}
      className="btn-primary w-full flex items-center justify-center gap-3 text-lg py-4"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          {text}
        </>
      ) : success ? (
        <>
          <CheckCircle2 className="w-5 h-5 text-green-300" />
          تم بنجاح
        </>
      ) : (
        text
      )}
    </motion.button>
  );
}
