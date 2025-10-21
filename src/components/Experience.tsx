import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  startYear: string;
  duration: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Yolo Group',
    role: 'Senior Android Engineer',
    location: 'Tallinn, Estonia',
    period: 'July 2023 - Present',
    startYear: '2023',
    duration: '1.5 years',
    highlights: [
      'Developed large-scale iGaming platform serving 2M+ monthly users',
      'Built real-time gaming features with WebSocket integration',
      'Optimized performance: 40% faster startup, 35% less memory, 99.5% crash-free',
      'Accelerated release cycles by 30% through comprehensive testing & CI/CD',
    ],
  },
  {
    company: 'Klar',
    role: 'Android Engineer',
    location: 'Berlin, Germany',
    period: 'May 2022 - June 2023',
    startYear: '2022',
    duration: '1 year',
    highlights: [
      'Built modular banking app serving 500K+ users with SOC 2 compliance',
      'Implemented biometric auth, Android Keystore encryption, certificate pinning',
      'Increased user engagement by 25% with custom Material Design 3 components',
      'Achieved 90% code coverage with comprehensive testing',
    ],
  },
  {
    company: 'Moniepoint',
    role: 'Senior Android Engineer',
    location: 'Lagos, Nigeria',
    period: 'January 2022 - October 2022',
    startYear: '2022',
    duration: '10 months',
    highlights: [
      'Architected payment SDK serving 5M+ users, processing $2B+ transactions',
      'Reduced SDK size by 45% through ProGuard optimization',
      'Improved transaction success rate by 18%',
      'Implemented Clean Architecture with MVVM, Coroutines, and PCI-DSS security',
    ],
  },
  {
    company: 'Lassod Consulting',
    role: 'Lead Android Engineer',
    location: 'Lagos, Nigeria',
    period: 'January 2021 - February 2022',
    startYear: '2021',
    duration: '1.1 years',
    highlights: [
      'Led team of 4 Android developers building consumer app (Oyoyo)',
      'Reduced deployment time from 4 hours to 30 minutes with CI/CD',
      'Achieved 85% notification open rate with Firebase integration',
    ],
  },
];

function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 mb-20 last:mb-0">
      {/* Left side content */}
      {isLeft && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-zinc-800 hover:border-[#d4c5a9]/50 transition-colors relative">
            {/* Period badge in top right */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">
              {experience.period}
            </div>

            <div className="mb-4 mt-8">
              <h3 className="text-xl md:text-2xl font-light text-white mb-2">{experience.role}</h3>
              <p className="text-[#d4c5a9] text-base md:text-lg mb-1">{experience.company}</p>
              <div className="text-sm text-zinc-500">
                <p>{experience.location}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, i) => (
                <li key={i} className="text-zinc-400 text-sm leading-relaxed">
                  <span className="text-zinc-600">• </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Timeline center with year */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
        <div
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-light"
          style={{
            borderColor: '#d4c5a9',
            backgroundColor: '#000',
            color: '#d4c5a9'
          }}
        >
          {experience.startYear}
        </div>
      </div>

      {/* Right side content */}
      {!isLeft && (
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, x: 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6 }}
          className="md:col-start-2"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-zinc-800 hover:border-[#d4c5a9]/50 transition-colors relative">
            {/* Period badge in top right */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400">
              {experience.period}
            </div>

            <div className="mb-4 mt-8">
              <h3 className="text-xl md:text-2xl font-light text-white mb-2">{experience.role}</h3>
              <p className="text-[#d4c5a9] text-base md:text-lg mb-1">{experience.company}</p>
              <div className="text-sm text-zinc-500">
                <p>{experience.location}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {experience.highlights.map((highlight, i) => (
                <li key={i} className="text-zinc-400 text-sm leading-relaxed">
                  <span className="text-zinc-600">• </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Spacer for left cards */}
      {!isLeft && <div className="hidden md:block" />}
    </div>
  );
}

export default function Experience() {
  return (
    <section className="py-20 md:py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ color: '#d4c5a9' }}>
            Experience
          </h2>
          <p className="text-zinc-500 text-base md:text-lg">
            7+ years building scalable Android applications across multiple industries
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline start pill with down arrow */}
          <div className="hidden md:flex justify-center mb-12">
            <div
              className="px-4 py-2 rounded-full border-2 flex items-center gap-2 text-sm font-light"
              style={{
                borderColor: '#d4c5a9',
                backgroundColor: '#000',
                color: '#d4c5a9'
              }}
            >
              <span>Timeline</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Continuous vertical timeline in center */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[2px] hidden md:block"
            style={{
              backgroundColor: '#d4c5a9',
              opacity: 0.3,
              top: '80px',
              bottom: '10%'
            }}
          />

          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
