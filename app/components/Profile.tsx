import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ScrollRevealSection from './ScrollRevealSection';
import SectionTitle from './SectionTitle';

interface ProfileProps {
  summary: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    linkedin?: string;
  };
}

export default function Profile({ summary, contact }: ProfileProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Split summary into sentences for staggered animation
  const sentences = summary.match(/[^.!?]+[.!?]+/g) || [summary];
  
  // Contact item animation variants
  const contactVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section 
      className="mb-16 max-w-3xl mx-auto"
      id="profile"
      ref={sectionRef}
    >
      <SectionTitle title="Profile" />
      
      <ScrollRevealSection
        revealDirection="up"
        delay={0.1}
        threshold={0.3}
      >
        <motion.div 
          className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-blue-500"
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <div className="mb-8">
            {sentences.map((sentence, i) => (
              <motion.p 
                key={i} 
                className="text-gray-700 dark:text-gray-300 mb-3 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: 0.2 + (i * 0.1),
                    duration: 0.5
                  }
                } : { opacity: 0, y: 20 }}
              >
                {sentence}
              </motion.p>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <motion.div 
              className="flex items-center"
              custom={0}
              variants={contactVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-base">{contact.location}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              custom={1}
              variants={contactVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-base">{contact.phone}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              custom={2}
              variants={contactVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a 
                href={`mailto:${contact.email}`} 
                className="text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {contact.email}
              </a>
            </motion.div>
            
            {contact.linkedin && (
              <motion.div 
                className="flex items-center"
                custom={3}
                variants={contactVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <a 
                  href={contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-base hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  LinkedIn
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </ScrollRevealSection>
    </motion.section>
  );
}