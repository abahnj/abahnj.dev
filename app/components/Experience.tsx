import { motion } from 'framer-motion';

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface ExperienceProps {
  jobs: Job[];
}

export default function Experience({ jobs }: ExperienceProps) {
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
      transition={{ delay: 0.7, duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2 border-gray-300 dark:border-gray-700">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          Experience
        </motion.span>
      </h3>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {jobs.map((job, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex flex-col md:flex-row md:justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{job.title}</h4>
                <div className="text-lg text-gray-700 dark:text-gray-300">{job.company}</div>
              </div>
              <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                <div className="text-sm text-gray-600 dark:text-gray-400">{job.location}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{job.period}</div>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {job.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}