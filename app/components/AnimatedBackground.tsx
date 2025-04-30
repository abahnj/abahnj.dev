import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950" />
      
      {/* Animated dots grid */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute w-full h-full bg-dot-pattern bg-[length:20px_20px]" />
      </div>
      
      {/* Interactive gradient that follows mouse */}
      <motion.div 
        className="absolute bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-cyan-500/10 rounded-full blur-3xl opacity-40"
        style={{
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
        }}
        animate={{
          x: mousePosition.x - 350,
          y: mousePosition.y - 350,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 50,
          mass: 0.5,
        }}
      />
      
      {/* Code-like particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-20 bg-blue-500/5 dark:bg-blue-500/10 rounded-md"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0.1 + Math.random() * 0.3,
            scale: 0.5 + Math.random() * 1
          }}
          animate={{ 
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, 0.1 + Math.random() * 0.3],
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: 'mirror', 
            duration: 15 + Math.random() * 20,
            delay: i * 0.7,
          }}
        />
      ))}
      
      {/* Tech-related symbols floating around */}
      {["{ }", "( )", "< />", "&&", "=>", "[]", "||", "function", "let", "const"].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-600/20 dark:text-blue-400/20 text-xl font-mono font-bold"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0.1 + Math.random() * 0.2,
            rotate: Math.random() * 180
          }}
          animate={{ 
            y: [null, Math.random() * window.innerHeight],
            rotate: [null, Math.random() * 360],
            opacity: [null, 0.1 + Math.random() * 0.2],
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: 'mirror', 
            duration: 20 + Math.random() * 30,
            delay: i * 1.2,
          }}
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}