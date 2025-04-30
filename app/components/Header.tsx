import { motion } from 'framer-motion';

interface HeaderProps {
  name: string;
  title: string;
}

export default function Header({ name, title }: HeaderProps) {
  // Variants for header container animation
  const headerVariants = {
    hidden: { 
      opacity: 0,
      y: -50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Letters animation for name
  const nameLetters = name.split("");
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.06),
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Title animation
  const titleVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8 
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 1.4,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Background gradient animation
  const gradientVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 1.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.header 
      className="py-10 mb-16 text-center relative overflow-hidden"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background gradient element */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl"
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
      />
      
      <div className="relative z-10 py-10">
        <div className="flex justify-center mb-4">
          {/* Individual letter animations for name */}
          <div className="overflow-hidden flex">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-gray-100 inline-block"
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>
        
        <motion.div
          className="relative"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl text-blue-600 dark:text-blue-400 font-medium"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {title}
          </motion.h2>
          <motion.div 
            className="h-1 w-40 bg-blue-500 dark:bg-blue-400 rounded-full mt-3 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "10rem" }}
            transition={{ delay: 1.6, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </motion.header>
  );
}