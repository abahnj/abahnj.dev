import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'Yolo Group',
    role: 'Senior Android Engineer',
    location: 'Tallinn, Estonia',
    period: 'July 2023 - Present',
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 pb-12 border-l-2 border-blue-500/30"
    >
      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500" />

      <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800 hover:border-blue-500/50 transition-colors">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-white">{experience.role}</h3>
            <p className="text-blue-400 font-semibold">{experience.company}</p>
          </div>
          <div className="text-sm text-zinc-400 mt-2 md:mt-0 md:text-right">
            <p>{experience.period}</p>
            <p>{experience.location}</p>
          </div>
        </div>

        <ul className="space-y-2">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="text-zinc-300 text-sm flex items-start">
              <span className="text-blue-400 mr-2 mt-1">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-zinc-400 text-lg">
            7+ years building scalable Android applications across multiple industries
          </p>
        </motion.div>

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
