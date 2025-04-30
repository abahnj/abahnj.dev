import { motion } from 'framer-motion';

interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  year: string;
}

interface EducationProps {
  education: EducationItem[];
}

export default function Education({ education }: EducationProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section 
      className="mb-12 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-300 dark:border-gray-700">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          Education
        </motion.span>
      </h3>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {education.map((item, index) => (
          <motion.div 
            key={index} 
            className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{item.institution}</h4>
                <div className="text-gray-700 dark:text-gray-300">{item.degree}</div>
              </div>
              <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                <div className="text-sm text-gray-600 dark:text-gray-400">{item.location}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.year}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}