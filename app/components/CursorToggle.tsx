import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export default function CursorToggle() {
  const { isCursorDisabled, toggleCursorEffects } = useCursor();
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center">
      <span className="text-xs mr-2 text-gray-500 dark:text-gray-400">
        Custom Cursor
      </span>
      <motion.button
        onClick={toggleCursorEffects}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          isCursorDisabled 
            ? 'bg-gray-300 dark:bg-gray-700' 
            : 'bg-blue-500 dark:bg-blue-600'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isCursorDisabled ? "Enable custom cursor" : "Disable custom cursor"}
        title={isCursorDisabled ? "Enable custom cursor" : "Disable custom cursor"}
      >
        <motion.div 
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
          animate={{ 
            x: isCursorDisabled ? 4 : 28
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
        
        {/* Icon indicating cursor state */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ opacity: isCursorDisabled ? 1 : 0 }}
        >
          <svg 
            className="h-3 w-3 text-gray-500" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center" 
          initial={false}
          animate={{ opacity: isCursorDisabled ? 0 : 1 }}
        >
          <svg 
            className="h-3 w-3 text-white" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5v14" />
          </svg>
        </motion.div>
      </motion.button>
    </div>
  );
}