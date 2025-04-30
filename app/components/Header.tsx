import { motion } from 'framer-motion';

interface HeaderProps {
  name: string;
  title: string;
}

export default function Header({ name, title }: HeaderProps) {
  return (
    <motion.header 
      className="py-8 mb-12 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {name}
      </motion.h1>
      <motion.h2 
        className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        {title}
      </motion.h2>
    </motion.header>
  );
}