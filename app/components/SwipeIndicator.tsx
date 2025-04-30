import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SwipeIndicatorProps {
  direction: 'left' | 'right' | 'both';
  showOnlyOnMobile?: boolean;
}

export default function SwipeIndicator({ 
  direction = 'both',
  showOnlyOnMobile = true
}: SwipeIndicatorProps) {
  const [visible, setVisible] = useState(true);
  
  // Hide indicator after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };
  
  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3 } }
  };
  
  const arrowVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: { repeat: Infinity, duration: 1.5 }
    }
  };
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className={`fixed bottom-10 left-0 right-0 z-50 flex justify-center items-center pointer-events-none
            ${showOnlyOnMobile ? 'sm:hidden' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="bg-black/70 dark:bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center space-x-3"
            variants={contentVariants}
          >
            {(direction === 'left' || direction === 'both') && (
              <motion.div 
                className="flex items-center"
                variants={arrowVariants}
                animate="pulse"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {direction === 'left' && <span className="text-sm ml-1">Swipe left</span>}
              </motion.div>
            )}
            
            {direction === 'both' && <span className="text-sm">Swipe to navigate</span>}
            
            {(direction === 'right' || direction === 'both') && (
              <motion.div 
                className="flex items-center"
                variants={arrowVariants}
                animate="pulse"
              >
                {direction === 'right' && <span className="text-sm mr-1">Swipe right</span>}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}