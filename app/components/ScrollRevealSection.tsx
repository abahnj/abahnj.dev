import { type ReactNode, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, type Variants } from 'framer-motion';

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  revealDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  once?: boolean;
  id?: string;
}

export default function ScrollRevealSection({
  children,
  className = '',
  revealDirection = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  distance = 50,
  once = true,
  id,
}: ScrollRevealSectionProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    amount: threshold,
    once: once 
  });

  // Define animation variants based on reveal direction
  const getVariants = (): Variants => {
    switch (revealDirection) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 }
        };
      case 'none':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  // Trigger animation when element comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth cubic bezier curve
      }}
    >
      {children}
    </motion.div>
  );
}