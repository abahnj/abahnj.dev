import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Josemaria Abah
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl text-zinc-300 mb-4"
          variants={itemVariants}
        >
          Senior Android Engineer
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Building high-performance native Android applications for iGaming, FinTech, and consumer platforms.
          7+ years of expertise in Kotlin, Jetpack Compose, and Clean Architecture.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={itemVariants}
        >
          <a
            href="https://linkedin.com/in/abahnj"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@abahnj.dev"
            className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          className="mt-12 text-zinc-500"
          variants={itemVariants}
        >
          <p className="text-sm">Tallinn, Estonia</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
