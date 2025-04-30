import { useState, useEffect, useRef, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TouchableTimelineMarker from './TouchableTimelineMarker';
import ScrollRevealSection from './ScrollRevealSection';
import SectionTitle from './SectionTitle';
import useSwipe from '../hooks/useSwipe';
import { SwipeDirection, triggerHapticFeedback } from '../utils/touchInteractions';
import SwipeIndicator from './SwipeIndicator';

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
  const [headerVisible, setHeaderVisible] = useState(false);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Create a ref for the container
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize job refs array based on jobs length
  useEffect(() => {
    jobRefs.current = Array(jobs.length).fill(null).map((_, i) => jobRefs.current[i] || null);
  }, [jobs.length]);
  
  // Setup scrolling behavior
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  // Scroll position for sticky header
  const { scrollY } = useScroll();
  
  // Handle swipe gestures on the experience container
  const handleSwipe = (direction: SwipeDirection) => {
    // Hide swipe indicator after first swipe
    if (showSwipeIndicator) {
      setShowSwipeIndicator(false);
    }
    
    if (direction === SwipeDirection.LEFT) {
      // Swipe left -> go to next job (if not at the end)
      if (activeIndex < jobs.length - 1) {
        triggerHapticFeedback('medium');
        scrollToJob(activeIndex + 1);
      }
    } else if (direction === SwipeDirection.RIGHT) {
      // Swipe right -> go to previous job (if not at the beginning)
      if (activeIndex > 0) {
        triggerHapticFeedback('medium');
        scrollToJob(activeIndex - 1);
      }
    }
  };
  
  // Setup swipe detection on the experience container
  useSwipe(experienceContainerRef, handleSwipe, {
    minDistance: 40,
    maxDuration: 500,
    enableHapticFeedback: true
  });
  
  // Check when experience section's title is at/near the top to show sticky header
  useEffect(() => {
    // When section title scrolls out of view, show the sticky header
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        // Show header when title is out of view (not intersecting)
        setHeaderVisible(!entry.isIntersecting);
      },
      { 
        rootMargin: "-10px 0px 0px 0px", // Small margin to create a smooth transition
        threshold: 0 // Trigger as soon as it leaves the viewport
      }
    );
    
    // When section scrolls completely out of view, hide sticky header
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        // If section is completely out of view in the upward direction, hide header
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setHeaderVisible(false);
        }
      },
      { threshold: 0 }
    );
    
    if (sectionTitleRef.current) titleObserver.observe(sectionTitleRef.current);
    if (sectionRef.current) sectionObserver.observe(sectionRef.current);
    
    return () => {
      titleObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);
  
  // Extract years from job periods to create timeline markers
  useEffect(() => {
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
        threshold: 0.2
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
      // If the sticky header is visible, adjust scroll position to account for it
      const offset = headerVisible ? -80 : 0;
      const topPosition = ref.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
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

  // Sticky header animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      {/* Mobile swipe indicator */}
      {showSwipeIndicator && (
        <SwipeIndicator direction="both" showOnlyOnMobile={true} />
      )}
      
      {/* Sticky header with timeline */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-md transition-opacity duration-300 ${headerVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        variants={headerVariants}
        initial="hidden"
        animate={headerVisible ? "visible" : "hidden"}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Name and title */}
            <div className="flex items-center mb-3 sm:mb-0">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Nnaemeka Abah
              </h2>
              <span className="ml-3 text-sm text-blue-600 dark:text-blue-400 font-medium">
                Software Engineer
              </span>
            </div>
            
            {/* Horizontal timeline */}
            <div className="w-full sm:w-auto sm:flex-1 max-w-md relative">
              <div className="mx-4 relative">
                {/* Horizontal line - adjusted for better mobile alignment */}
                <div className="absolute h-0.5 bg-gray-300 dark:bg-gray-700 left-0 right-0 top-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 z-0"></div>
                
                {/* Selected position indicator */}
                <motion.div 
                  className="absolute h-0.5 bg-blue-500 dark:bg-blue-400 left-0 top-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 z-0"
                  animate={{ 
                    width: `${(activeIndex / (timelineMarkers.length - 1)) * 100}%` 
                  }}
                  transition={{ duration: 0.4 }}
                ></motion.div>
                
                {/* Year markers */}
                <div className="flex justify-between items-center h-12 relative">
                  {timelineMarkers.map((marker, index) => (
                    <TouchableTimelineMarker 
                      key={index} 
                      year={marker.year}
                      isSelected={activeIndex === index}
                      onClick={() => scrollToJob(index)}
                      compact={true}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Extra padding div to create space under the sticky header */}
        <div className="h-3"></div>
      </motion.div>
      
      {/* Main experience section */}
      <motion.section 
        ref={sectionRef}
        className="mb-16 pt-8"
        id="experience"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div ref={sectionTitleRef}>
            <SectionTitle title="Experience" />
          </div>

          {/* Main timeline (visible when not in sticky header) */}
          <ScrollRevealSection
            revealDirection="up"
            delay={0.2}
            threshold={0.2}
            className="mb-16 pt-4"
          >
            <div className="relative">
              {/* Horizontal line */}
              <div className="absolute h-0.5 bg-gray-300 dark:bg-gray-700 left-0 right-0 top-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 z-0"></div>
              
              {/* Selected position indicator */}
              <motion.div 
                className="absolute h-0.5 bg-blue-500 dark:bg-blue-400 left-0 top-3 sm:top-1/2 sm:transform sm:-translate-y-1/2 z-0"
                animate={{ 
                  width: `${(activeIndex / (timelineMarkers.length - 1)) * 100}%` 
                }}
                transition={{ duration: 0.4 }}
              ></motion.div>
              
              {/* Year markers */}
              <div className="flex justify-between items-center h-16 relative">
                {timelineMarkers.map((marker, index) => (
                  <TouchableTimelineMarker 
                    key={index} 
                    year={marker.year}
                    isSelected={activeIndex === index}
                    onClick={() => scrollToJob(index)}
                  />
                ))}
              </div>
            </div>
          </ScrollRevealSection>
          
          {/* Job cards - added extra top margin */}
          <div ref={experienceContainerRef} className="space-y-16 mt-10">
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
                        : 'border-gray-300 dark:border-gray-700'}
                      touch-manipulation`} // Added touch-manipulation for better mobile touch handling
                    whileHover={{ scale: 1.01, x: index % 2 === 0 ? 5 : -5 }}
                    whileTap={{ scale: 0.98 }} // Added tap animation for touch feedback
                    animate={{
                      borderLeftColor: activeIndex === index 
                        ? (index % 2 === 0 ? '#3b82f6' : '#8b5cf6') 
                        : '#d1d5db'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {/* Time marker dot */}
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
    </>
  );
}