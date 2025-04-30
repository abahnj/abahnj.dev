import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [timelineMarkers, setTimelineMarkers] = useState<{ year: string, index: number }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize job refs array based on jobs length
  useEffect(() => {
    jobRefs.current = Array(jobs.length).fill(null).map((_, i) => jobRefs.current[i] || null);
  }, [jobs.length]);
  
  // Setup scrolling behavior
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  
  // Timeline animation - follows scroll progress
  const timelineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const timelineY = useTransform(scrollYProgress, [0, 0.05], [20, 0]);
  
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
  
  // Check which job is in view and update the active index
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px', // Consider element in view when it's in the middle portion of viewport
        threshold: 0.1
      }
    );
    
    jobRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      jobRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  // Scroll to job when timeline marker is clicked
  const scrollToJob = (index: number) => {
    const ref = jobRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      ref={sectionRef}
      className="mb-16 relative pt-8"
      id="experience"
    >
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle title="Experience" />
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar timeline (visible on medium screens and up) */}
        <motion.div 
          className="hidden md:block md:w-1/5 lg:w-1/6 sticky top-8 self-start h-screen pt-24 pb-8 pr-4 overflow-hidden"
          style={{
            opacity: timelineOpacity,
            y: timelineY
          }}
        >
          <div className="relative h-full flex flex-col items-center">
            {/* Vertical timeline line */}
            <div className="absolute h-full w-0.5 bg-gray-300 dark:bg-gray-700 left-0 ml-3 z-0"></div>
            
            {/* Active position indicator */}
            <motion.div 
              className="absolute w-0.5 bg-blue-500 dark:bg-blue-400 left-0 ml-3 z-0"
              style={{
                top: 0,
                height: `${(activeIndex / (timelineMarkers.length - 1)) * 100}%`
              }}
              transition={{ duration: 0.4 }}
            ></motion.div>
            
            {/* Year markers */}
            <div className="relative flex flex-col h-full justify-between py-10 w-full">
              {timelineMarkers.map((marker, index) => (
                <TimelineMarker 
                  key={index} 
                  year={marker.year}
                  isSelected={activeIndex === index}
                  onClick={() => scrollToJob(index)}
                  vertical={true}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Mobile timeline (visible only on small screens) */}
        <ScrollRevealSection
          revealDirection="up"
          delay={0.2}
          threshold={0.2}
          className="md:hidden mb-12 pt-4"
        >
          <div className="relative flex items-center justify-between mx-auto">
            {/* Horizontal line */}
            <div className="absolute h-0.5 bg-gray-300 dark:bg-gray-700 left-0 right-0 z-0"></div>
            
            {/* Selected position indicator */}
            <motion.div 
              className="absolute h-0.5 bg-blue-500 dark:bg-blue-400 left-0 z-0"
              animate={{ 
                width: `${(activeIndex / (timelineMarkers.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.4 }}
            ></motion.div>
            
            {/* Year markers */}
            {timelineMarkers.map((marker, index) => (
              <TimelineMarker 
                key={index} 
                year={marker.year}
                isSelected={activeIndex === index}
                onClick={() => scrollToJob(index)}
                vertical={false}
              />
            ))}
          </div>
        </ScrollRevealSection>
        
        {/* Job cards */}
        <div className="md:w-4/5 lg:w-5/6 space-y-16">
          {jobs.map((job, index) => {
            // Alternate animation directions for job cards
            const direction = index % 2 === 0 ? 'left' : 'right';
            
            return (
              <ScrollRevealSection
                key={index}
                revealDirection={direction}
                delay={0.1}
                threshold={0.2}
              >
                <motion.div 
                  ref={(el) => {
                    jobRefs.current[index] = el;
                    return undefined;
                  }}
                  data-index={index}
                  className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg 
                    transition-shadow relative border-l-4 
                    ${activeIndex === index 
                      ? (index % 2 === 0 ? 'border-blue-500' : 'border-purple-500') 
                      : 'border-gray-300 dark:border-gray-700'}`}
                  whileHover={{ scale: 1.01, x: index % 2 === 0 ? 5 : -5 }}
                  animate={{
                    borderLeftColor: activeIndex === index 
                      ? (index % 2 === 0 ? '#3b82f6' : '#8b5cf6') 
                      : '#d1d5db'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Time marker dot (visible on mobile) */}
                  <div className={`absolute -left-3 top-6 w-6 h-6 rounded-full 
                    ${activeIndex === index 
                      ? 'bg-blue-500 dark:bg-blue-400' 
                      : 'bg-gray-300 dark:bg-gray-700'} 
                    flex items-center justify-center transition-colors duration-300`}>
                    <div className={`w-3 h-3 rounded-full 
                      ${activeIndex === index 
                        ? 'bg-white dark:bg-gray-900' 
                        : 'bg-gray-100 dark:bg-gray-600'}`} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between mb-6">
                    <div>
                      <h4 className={`text-xl font-semibold transition-colors duration-300
                        ${activeIndex === index 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-700 dark:text-gray-300'}`}>
                        {job.title}
                      </h4>
                      <div className="text-lg text-gray-700 dark:text-gray-300">
                        {job.company}
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 md:mt-0 md:items-end">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {job.location}
                      </div>
                      <div className={`text-sm font-medium px-3 py-1 rounded-full mt-1 transition-colors duration-300
                        ${activeIndex === index 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                        {job.period}
                      </div>
                    </div>
                  </div>
                  
                  <motion.ul className="list-none space-y-2 text-gray-700 dark:text-gray-300"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {job.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i}
                        custom={i}
                        variants={achievementVariants}
                        className="flex items-start"
                      >
                        <span className={`inline-block mr-2 mt-1 transition-colors duration-300
                          ${activeIndex === index 
                            ? 'text-blue-500 dark:text-blue-400' 
                            : 'text-gray-400 dark:text-gray-500'}`}>→</span>
                        {achievement}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </ScrollRevealSection>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}