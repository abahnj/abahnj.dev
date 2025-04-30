import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimelineMarker from './TimelineMarker';
import ScrollRevealSection from './ScrollRevealSection';
import SectionTitle from './SectionTitle';

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface ExperienceTimelineProps {
  jobs: Job[];
}

export default function ExperienceTimeline({ jobs }: ExperienceTimelineProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [timelineMarkers, setTimelineMarkers] = useState<{ year: string, index: number }[]>([]);
  
  useEffect(() => {
    // Extract years from job periods to create timeline markers
    const markers = jobs.map((job, index) => {
      // Extract the first year from period (assuming format "MM/YYYY—Present" or "MM/YYYY—MM/YYYY")
      const yearMatch = job.period.match(/(\d{4})/);
      const year = yearMatch ? yearMatch[1] : job.period;
      return { year, index };
    });
    
    setTimelineMarkers(markers);
  }, [jobs]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.3
      }
    })
  };

  return (
    <motion.section 
      className="mb-16 max-w-4xl mx-auto"
      id="experience"
    >
      <SectionTitle title="Experience" />
      
      {/* Timeline bar with year markers */}
      <ScrollRevealSection
        revealDirection="up"
        delay={0.2}
        threshold={0.2}
      >
        <div className="mb-12 pt-10">
          <div className="relative flex items-center justify-between max-w-3xl mx-auto">
            {/* Horizontal line */}
            <div className="absolute h-0.5 bg-gray-300 dark:bg-gray-700 left-0 right-0 z-0"></div>
            
            {/* Selected position indicator */}
            <motion.div 
              className="absolute h-0.5 bg-blue-500 dark:bg-blue-400 left-0 z-0"
              animate={{ 
                width: `${(selectedIndex / (timelineMarkers.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            ></motion.div>
            
            {/* Year markers */}
            {timelineMarkers.map((marker, index) => (
              <TimelineMarker 
                key={index} 
                year={marker.year}
                isSelected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </ScrollRevealSection>
      
      {/* Selected job details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndex}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative"
        >
          <div className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow
            border-l-4 ${selectedIndex % 2 === 0 ? 'border-blue-500' : 'border-purple-500'}`}
          >
            <div className="flex flex-col md:flex-row md:justify-between mb-6">
              <div>
                <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {jobs[selectedIndex].title}
                </h4>
                <div className="text-lg text-gray-700 dark:text-gray-300">
                  {jobs[selectedIndex].company}
                </div>
              </div>
              <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {jobs[selectedIndex].location}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full mt-1">
                  {jobs[selectedIndex].period}
                </div>
              </div>
            </div>
            
            <ul className="list-none space-y-2 text-gray-700 dark:text-gray-300">
              {jobs[selectedIndex].achievements.map((achievement, i) => (
                <motion.li 
                  key={i}
                  custom={i}
                  variants={achievementVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start"
                >
                  <span className="inline-block mr-2 mt-1 text-blue-500 dark:text-blue-400">→</span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <motion.button
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={selectedIndex === 0}
          onClick={() => setSelectedIndex(prev => Math.max(0, prev - 1))}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </motion.button>
        
        <motion.button
          className="px-4 py-2 rounded-lg bg-blue-500 dark:bg-blue-600 text-white
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={selectedIndex === jobs.length - 1}
          onClick={() => setSelectedIndex(prev => Math.min(jobs.length - 1, prev + 1))}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </motion.section>
  );
}