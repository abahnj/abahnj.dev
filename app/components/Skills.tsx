import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollRevealSection from './ScrollRevealSection';
import SectionTitle from './SectionTitle';

interface SkillCategory {
  category: string;
  skills: string[];
}

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export default function Skills({ skillCategories }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <motion.section 
      ref={sectionRef}
      className="mb-16 max-w-4xl mx-auto"
      id="skills"
    >
      <SectionTitle title="Skills" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => {
          // Create a staggered effect with varying reveal directions
          const directions = ['up', 'right', 'left', 'down'];
          const direction = directions[index % directions.length] as 'up' | 'right' | 'left' | 'down';
          
          return (
            <ScrollRevealSection
              key={index}
              revealDirection={direction}
              delay={0.1 * index}
              threshold={0.2}
              className="h-full"
            >
              <motion.div 
                className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <h4 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center">
                  {/* Category icon based on category name */}
                  <CategoryIcon category={category.category} />
                  <span className="ml-2">{category.category}</span>
                </h4>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span 
                      key={i} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1,
                        transition: {
                          delay: 0.3 + (i * 0.05),
                          duration: 0.2,
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }
                      } : { opacity: 0, scale: 0.8 }}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: "#dbeafe",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ScrollRevealSection>
          );
        })}
      </div>
    </motion.section>
  );
}

// Helper component to render category-specific icons
function CategoryIcon({ category }: { category: string }) {
  const iconClassName = "w-5 h-5 text-blue-500 dark:text-blue-400";
  
  switch(category.toLowerCase()) {
    case 'languages':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      );
    case 'frameworks/libraries':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'mobile development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'backend':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'devops':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    case 'testing':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'tools':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'methodologies':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={iconClassName} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}