import { motion } from 'framer-motion';

export default function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <motion.div
      className="error-fallback"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="error-fallback__content">
        <h2>Что-то пошло не так</h2>
        <p>{error?.message || 'Произошла непредвиденная ошибка'}</p>
        {resetErrorBoundary && (
          <button onClick={resetErrorBoundary} className="btn btn--primary">
            Попробовать снова
          </button>
        )}
      </div>
    </motion.div>
  );
}
