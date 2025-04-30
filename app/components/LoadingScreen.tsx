import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  name: string;
  title: string;
  onAnimationComplete: () => void;
}

export default function LoadingScreen({ name, title, onAnimationComplete }: LoadingScreenProps) {
  const [showTitle, setShowTitle] = useState(false);
  
  // Generate random dot positions
  const dots = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 5,
    delay: Math.random() * 0.5,
  }));
  
  // Staggered letters for name
  const nameLetters = name.split("");
  
  // Title animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: [1, 1, 1, 0],
        scale: [1, 1, 1.05, 1.1]
      }}
      transition={{ 
        duration: 5.5, 
        times: [0, 0.8, 0.9, 1],
        ease: "easeInOut" 
      }}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Animated dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500 dark:bg-blue-400"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0.3, 0],
            scale: [0, 1, 0.8, 0]
          }}
          transition={{
            duration: 4.5,
            delay: dot.delay,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Animated code brackets */}
      <motion.div
        className="absolute text-blue-500/20 dark:text-blue-400/30 text-9xl font-mono font-bold"
        initial={{ opacity: 0, scale: 0.8, x: -100 }}
        animate={{ 
          opacity: [0, 0.7, 0],
          scale: [0.8, 1, 0.9],
          x: [-100, 0, -50]
        }}
        transition={{ 
          duration: 4,
          times: [0, 0.4, 1],
          ease: "easeInOut" 
        }}
      >
        {"<"}
      </motion.div>
      
      <motion.div
        className="absolute text-blue-500/20 dark:text-blue-400/30 text-9xl font-mono font-bold"
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ 
          opacity: [0, 0.7, 0],
          scale: [0.8, 1, 0.9],
          x: [100, 0, 50]
        }}
        transition={{ 
          duration: 4,
          times: [0, 0.4, 1],
          ease: "easeInOut" 
        }}
      >
        {"/>"}
      </motion.div>
      
      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Name with letter-by-letter animation */}
        <div className="flex overflow-hidden">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 inline-block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1 
              }}
              transition={{
                duration: 0.8,
                delay: 0.5 + (i * 0.08),
                ease: [0.22, 1, 0.36, 1]
              }}
              // Export values for parent component to use in name transition
              id={`loading-letter-${i}`}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
        
        {/* Title text */}
        {showTitle && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.2
              }}
            >
              {title}
            </motion.h2>
            
            <motion.div 
              className="h-1 w-0 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 mx-auto"
              animate={{ width: "10rem" }}
              transition={{ duration: 1.2, delay: 0.4 }}
            />
          </motion.div>
        )}
      </div>
      
      {/* Loading indicator */}
      <motion.div 
        className="absolute bottom-10 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 3,
          times: [0, 0.1, 1],
          delay: 0.5, 
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="h-1 w-40 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-blue-500 dark:bg-blue-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}