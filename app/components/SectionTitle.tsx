import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  className?: string;
  delay?: number;
}

export default function SectionTitle({ 
  title, 
  className = '',
  delay = 0 
}: SectionTitleProps) {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay + (i * 0.03),
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: {
        delay: delay + (title.length * 0.03) + 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div className={`relative mb-6 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 pb-2">
        <div className="overflow-hidden flex">
          {title.split('').map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>
      </h3>
      <motion.div
        className="h-0.5 bg-blue-500 dark:bg-blue-400 rounded"
        variants={underlineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </div>
  );
}