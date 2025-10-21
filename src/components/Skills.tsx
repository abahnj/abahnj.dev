import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'Dart', 'SQL'],
  },
  {
    title: 'Android',
    skills: ['Jetpack Compose', 'Material Design 3', 'Custom Views', 'XML Layouts'],
  },
  {
    title: 'Architecture',
    skills: ['MVVM', 'MVI', 'Clean Architecture', 'SOLID Principles'],
  },
  {
    title: 'Jetpack',
    skills: ['Navigation', 'Room', 'Hilt', 'Paging 3', 'WorkManager', 'LiveData'],
  },
  {
    title: 'Async',
    skills: ['Coroutines', 'Flow', 'StateFlow', 'RxJava'],
  },
  {
    title: 'Networking',
    skills: ['Retrofit', 'OkHttp', 'Ktor', 'GraphQL', 'WebSockets'],
  },
  {
    title: 'Testing',
    skills: ['JUnit 5', 'Mockito', 'Espresso', 'MockK', 'TDD'],
  },
  {
    title: 'CI/CD',
    skills: ['GitHub Actions', 'Fastlane', 'Gradle', 'Firebase'],
  },
  {
    title: 'Security',
    skills: ['Android Keystore', 'Biometric API', 'Certificate Pinning', 'Encryption'],
  },
];

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-full text-sm text-zinc-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
    >
      {skill}
    </motion.span>
  );
}

export default function Skills() {
  return (
    <section className="py-20 px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-zinc-400 text-lg">
            Expert-level proficiency in modern Android development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-800"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillTag
                    key={skill}
                    skill={skill}
                    index={categoryIndex * 10 + skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
