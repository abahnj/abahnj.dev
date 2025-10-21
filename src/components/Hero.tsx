import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
      <motion.div
        className="max-w-6xl w-full text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Title - Large and Elegant */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6"
          variants={itemVariants}
          style={{
            color: '#f5f1e8',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Mobile Engineer
          <span
            className="block text-5xl md:text-7xl lg:text-8xl mt-4 italic font-serif"
            style={{
              color: '#d4c5a9',
              fontWeight: 300,
            }}
          >
            & Developer
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-lg text-zinc-400 mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
          style={{
            letterSpacing: '0.02em',
            lineHeight: 1.6,
          }}
        >
          Building high-performance native applications for iGaming, FinTech, and consumer platforms.
          <br />
          7+ years of expertise in Kotlin, Jetpack Compose, and Clean Architecture.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-6 justify-center flex-wrap mb-16"
          variants={itemVariants}
        >
          <a
            href="mailto:hello@abahnj.dev"
            className="px-8 py-3 bg-[#d4c5a9] text-black font-medium tracking-wide hover:bg-[#c4b599] transition-all duration-300"
            style={{
              letterSpacing: '0.05em',
            }}
          >
            LET'S TALK
          </a>
          <a
            href="https://linkedin.com/in/abahnj"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-zinc-700 text-zinc-300 font-medium tracking-wide hover:border-zinc-600 hover:bg-zinc-900/30 transition-all duration-300"
            style={{
              letterSpacing: '0.05em',
            }}
          >
            VIEW WORK
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-20"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center gap-2 text-zinc-600">
            <svg
              className="w-5 h-5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="text-xs tracking-widest uppercase">MY SERVICES</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
