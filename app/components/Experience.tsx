import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollRevealSection from './ScrollRevealSection';
import SectionTitle from './SectionTitle';

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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const achievementVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.4
      }
    })
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="mb-16 max-w-4xl mx-auto"
      id="experience"
    >
      <SectionTitle title="Experience" />

      <div className="space-y-12">
        {jobs.map((job, index) => {
          // Alternate animation directions for job cards
          const direction = index % 2 === 0 ? 'left' : 'right';
          
          return (
            <ScrollRevealSection
              key={index}
              revealDirection={direction}
              delay={0.1 * index}
              threshold={0.2}
              className="relative"
            >
              {/* Connector line for visual timeline effect */}
              {index < jobs.length - 1 && (
                <div className="absolute left-6 top-full w-0.5 h-12 bg-blue-200 dark:bg-blue-900 z-0" />
              )}

              <motion.div 
                className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow relative z-10 border-l-4 ${index % 2 === 0 ? 'border-blue-500' : 'border-purple-500'}`}
                whileHover={{ scale: 1.01, x: index % 2 === 0 ? 5 : -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Time period marker */}
                <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-400 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-900" />
                </div>
                
                <div className="flex flex-col md:flex-row md:justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{job.title}</h4>
                    <div className="text-lg text-gray-700 dark:text-gray-300">{job.company}</div>
                  </div>
                  <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                    <div className="text-sm text-gray-600 dark:text-gray-400">{job.location}</div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mt-1">{job.period}</div>
                  </div>
                </div>
                
                <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300">
                  {job.achievements.map((achievement, i) => (
                    <motion.li 
                      key={i}
                      custom={i}
                      variants={achievementVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="flex items-start"
                    >
                      <span className="inline-block mr-2 mt-1 text-blue-500 dark:text-blue-400">→</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollRevealSection>
          );
        })}
      </div>
    </motion.section>
  );
}