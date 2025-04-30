import { motion } from 'framer-motion';

interface TimelineMarkerProps {
  year: string;
  isSelected: boolean;
  onClick: () => void;
  vertical?: boolean;
  compact?: boolean;
}

export default function TimelineMarker({ 
  year, 
  isSelected, 
  onClick,
  vertical = false,
  compact = false
}: TimelineMarkerProps) {
  // Animation for markers
  const markerAnimation = {
    scale: isSelected ? 1.2 : 1,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  };

  // Vertical timeline marker (not used in current design, but keeping for future reference)
  if (vertical) {
    return (
      <motion.div 
        className="relative cursor-pointer flex items-center w-full"
        onClick={onClick}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Timeline marker */}
        <motion.div 
          className={`w-6 h-6 rounded-full flex items-center justify-center
            ${isSelected 
              ? 'bg-blue-500 dark:bg-blue-400 shadow-md shadow-blue-200 dark:shadow-blue-900/40' 
              : 'bg-gray-300 dark:bg-gray-700'}`}
          whileHover={{ scale: 1.2 }}
          animate={markerAnimation}
        >
          <motion.div 
            className={`w-3 h-3 rounded-full 
              ${isSelected 
                ? 'bg-white dark:bg-gray-900' 
                : 'bg-gray-100 dark:bg-gray-600'}`}
            animate={{ 
              scale: isSelected ? 0.8 : 1
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        
        {/* Year label (to the right of the marker) */}
        <motion.div 
          className={`ml-4 text-sm font-semibold transition-colors duration-300
            ${isSelected 
              ? 'text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-500 dark:text-gray-400'}`}
          animate={{ 
            x: isSelected ? 3 : 0,
            fontWeight: isSelected ? 600 : 500
          }}
          transition={{ duration: 0.2 }}
        >
          {year}
        </motion.div>
      </motion.div>
    );
  }

  // Compact marker for the sticky header
  if (compact) {
    return (
      <motion.div 
        className="relative cursor-pointer z-10"
        onClick={onClick}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Compact marker dot */}
        <motion.div 
          className={`w-4 h-4 rounded-full flex items-center justify-center
            ${isSelected 
              ? 'bg-blue-500 dark:bg-blue-400 shadow-sm shadow-blue-200 dark:shadow-blue-900/40' 
              : 'bg-gray-300 dark:bg-gray-700'}`}
          whileHover={{ scale: 1.2 }}
          animate={{
            scale: isSelected ? 1.2 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <motion.div 
            className={`w-2 h-2 rounded-full 
              ${isSelected 
                ? 'bg-white dark:bg-gray-900' 
                : 'bg-gray-100 dark:bg-gray-600'}`}
            animate={{ 
              scale: isSelected ? 0.8 : 1
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        
        {/* Compact year label */}
        <motion.div 
          className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium
            ${isSelected 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-500 dark:text-gray-400'}`}
          animate={{ 
            opacity: isSelected ? 1 : 0.7,
            y: isSelected ? 0 : 2
          }}
          transition={{ duration: 0.2 }}
        >
          {year}
        </motion.div>
      </motion.div>
    );
  }

  // Default horizontal marker
  return (
    <motion.div 
      className="relative cursor-pointer z-10"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Year label */}
      <motion.div 
        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold
          ${isSelected 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-gray-500 dark:text-gray-400'}`}
        animate={{ 
          scale: isSelected ? 1.1 : 1,
          y: isSelected ? -2 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        {year}
      </motion.div>
      
      {/* Timeline marker */}
      <motion.div 
        className={`w-6 h-6 rounded-full flex items-center justify-center
          ${isSelected 
            ? 'bg-blue-500 dark:bg-blue-400 shadow-md shadow-blue-200 dark:shadow-blue-900/40' 
            : 'bg-gray-300 dark:bg-gray-700'}`}
        whileHover={{ scale: 1.2 }}
        animate={{
          scale: isSelected ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <motion.div 
          className={`w-3 h-3 rounded-full 
            ${isSelected 
              ? 'bg-white dark:bg-gray-900' 
              : 'bg-gray-100 dark:bg-gray-600'}`}
          animate={{ 
            scale: isSelected ? 0.8 : 1
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
}