import { motion } from 'framer-motion';
import ScrollRevealSection from './ScrollRevealSection';
import SectionTitle from './SectionTitle';

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
  return (
    <motion.section 
      className="mb-16 max-w-4xl mx-auto"
      id="education"
    >
      <SectionTitle title="Education" />

      <div className="space-y-6">
        {education.map((item, index) => (
          <ScrollRevealSection
            key={index}
            revealDirection="up"
            delay={0.2}
            threshold={0.3}
            className="relative"
          >
            <motion.div 
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-blue-400"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                {/* School icon */}
                <div className="flex items-center">
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{item.institution}</h4>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">{item.degree}</div>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0">
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-600 dark:text-gray-400">{item.location}</div>
                    <div className="text-sm font-medium text-white dark:text-gray-900 bg-blue-500 dark:bg-blue-400 px-3 py-1 rounded-full mt-1">
                      {item.year}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
              </div>
            </motion.div>
          </ScrollRevealSection>
        ))}
      </div>
    </motion.section>
  );
}