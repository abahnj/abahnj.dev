import { motion } from 'framer-motion';

export default function Contact() {
  const contactLinks = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hello@abahnj.dev',
      href: 'mailto:hello@abahnj.dev',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/abahnj',
      href: 'https://linkedin.com/in/abahnj',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+372 5355 3097',
      href: 'tel:+37253553097',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Tallinn, Estonia',
      href: null,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-lg">
            Open to exciting opportunities and collaborations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {contactLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={link.href ? { scale: 1.02, y: -2 } : {}}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block p-6 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{link.icon}</span>
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">{link.label}</p>
                      <p className="text-zinc-200 font-medium">{link.value}</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="p-6 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{link.icon}</span>
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">{link.label}</p>
                      <p className="text-zinc-200 font-medium">{link.value}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
