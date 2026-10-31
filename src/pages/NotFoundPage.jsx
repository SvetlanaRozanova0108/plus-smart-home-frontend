import { motion } from 'framer-motion';
import NotFoundPageFallback from './NotFoundPageFallback';

export default function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NotFoundPageFallback />
    </motion.div>
  );
}
