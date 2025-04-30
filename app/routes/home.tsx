import { motion } from "framer-motion";
import type { Route } from "./+types/home";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Footer from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Nnaemeka Abah | Software Engineer" },
    { name: "description", content: "Software Engineer specializing in cross-platform mobile development using Flutter and native technologies" },
  ];
}

export default function Home() {
  const profile = {
    summary: "Results-driven Software Engineer with 7+ years of experience specializing in cross-platform mobile development using Flutter and native technologies. Proven track record of improving application performance, implementing robust testing frameworks, and leading successful development teams. Skilled in reducing deployment time and delivering intuitive user experiences that reach millions of users monthly.",
    contact: {
      location: "Tallinn, Estonia",
      phone: "+37253553097",
      email: "hello@abahnj.dev",
      linkedin: "https://linkedin.com/in/nnaemekaabah",
    }
  };

  const jobs = [
    {
      title: "Mobile Engineer",
      company: "Yolo Group",
      location: "Tallinn, Estonia",
      period: "07/2023—Present",
      achievements: [
        "Led the successful migration of a large-scale Casino games platform to Flutter, handling complex cross-platform integration challenges for a platform serving 100,000+ daily active users",
        "Implemented comprehensive testing suite that reduced time-to-live for new features by 40%",
        "Optimized app performance by 25% through code refactoring and state management improvements",
        "Collaborated with cross-functional teams to ensure seamless integration of new features and maintain 99.9% uptime"
      ]
    },
    {
      title: "Software Engineer",
      company: "Klar",
      location: "Berlin, Germany",
      period: "05/2022—06/2023",
      achievements: [
        "Built a world-class banking application using Flutter, focusing on scalability and performance for the Mexican market",
        "Reduced onboarding drop-off rate by 35% through implementation of modular KYC architecture",
        "Integrated robust security features including encryption, biometric authentication, and secure storage protocols",
        "Collaborated with UX/UI teams to create intuitive, accessible interfaces that increased user retention by 22%",
        "Utilized BLoC pattern for state management and implemented automated UI testing with Flutter Driver"
      ]
    },
    {
      title: "Software Engineer (Mobile)",
      company: "TeamApt Inc. (now Moniepoint Inc)",
      location: "Remote",
      period: "01/2022—10/2022",
      achievements: [
        "Delivered payment solutions used by over 5 million Nigerians monthly, processing $500M+ in monthly transactions",
        "Spearheaded the refactoring of mobile SDK from React Native to Flutter, achieving 15% increase in completed checkouts and 20% decrease in checkout abandonment rate",
        "Made key architectural decisions for new feature development, focusing on scalability and maintainability",
        "Implemented comprehensive error tracking that reduced customer-reported issues by 40%"
      ]
    },
    {
      title: "Mobile Development Lead",
      company: "Lassod Consulting",
      location: "Remote",
      period: "01/2021—02/2022",
      achievements: [
        "Managed a team of 6 engineers in building Oyoyo, a cross-platform Flutter application for African creatives",
        "Designed and implemented modular architecture allowing for rapid feature development and testing",
        "Established CI/CD pipeline reducing deployment time from 2 days to 4 hours",
        "Integrated analytics resulting in 30% increase in conversion rate and improved user engagement",
        "Implemented comprehensive testing strategy with 85% code coverage"
      ]
    },
    {
      title: "Software Engineer",
      company: "Norvera Solutions",
      location: "Remote",
      period: "07/2018—02/2021",
      achievements: [
        "Led development of a React web application providing estate management services including visitor and service tracking",
        "Developed and optimized 9 REST APIs to support both web and mobile clients",
        "Improved REST API performance by 30% using Varnish as a cache layer",
        "Reduced technical debt by 80% by implementing TDD and regression testing across the codebase",
        "Built high-performance, reusable Kotlin components for Android, resulting in 25% reduction in development time"
      ]
    }
  ];

  const skillCategories = [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Kotlin", "Dart", "C", "HTML/CSS"]
    },
    {
      category: "Frameworks/Libraries",
      skills: ["Flutter", "React", "React Native"]
    },
    {
      category: "Mobile Development",
      skills: ["iOS", "Android", "Cross-platform"]
    },
    {
      category: "Backend",
      skills: ["REST API design & integration"]
    },
    {
      category: "DevOps",
      skills: ["CI/CD pipelines", "Jenkins", "GitHub Actions"]
    },
    {
      category: "Testing",
      skills: ["TDD", "Unit Testing", "Integration Testing", "Regression Testing"]
    },
    {
      category: "Tools",
      skills: ["Git", "Jira", "Figma", "Firebase", "Varnish Cache"]
    },
    {
      category: "Methodologies",
      skills: ["Agile", "Scrum"]
    }
  ];

  const education = [
    {
      institution: "University of Nigeria, Nsukka",
      location: "Nigeria",
      degree: "Bachelor of Science in Computer Science",
      year: "2019"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto max-w-5xl">
        <Header name="Nnaemeka Abah" title="Software Engineer" />
        <Profile summary={profile.summary} contact={profile.contact} />
        <Experience jobs={jobs} />
        <Skills skillCategories={skillCategories} />
        <Education education={education} />
        <Footer />
      </div>
    </motion.div>
  );
}