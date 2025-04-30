import { motion } from 'framer-motion';

interface TimelineMarkerProps {
  year: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TimelineMarker({ 
  year, 
  isSelected, 
  onClick 
}: TimelineMarkerProps) {
  return (
    <motion.div 
      className="relative cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Year label */}
      <motion.div 
        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold
          ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
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