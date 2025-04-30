import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      className="py-6 mt-12 border-t border-gray-300 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <p>© {new Date().getFullYear()} Nnaemeka Abah. All rights reserved.</p>
      <p className="mt-1">Built with React Router & Framer Motion</p>
    </motion.footer>
  );
}