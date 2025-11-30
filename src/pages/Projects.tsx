import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ProjectDetailsModal from '../components/ProjectDetailsModal'
import '../styles/landing.css'

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
    show: { transition: { staggerChildren: 0.12 } }
}

interface Project {
    title: string
    category: string
    description: string
    image: string
    technologies: string[]
    features: string[]
    link: string
    status: string
    color: string
    detailedDescription?: string
    demoUrl?: string
    repoUrl?: string
}

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleProjectClick = (project: Project, e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        setSelectedProject(project)
        setIsModalOpen(true)
        toast.success(`Loading ${project.title}...`, { duration: 1000 })
    }
    const projects: Project[] = [
        {
            title: 'Full-Stack Portfolio Website',
            category: 'Full-Stack Development',
            description: 'Modern portfolio with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion animations, and premium A+B+C blend design system.',
            image: '🌐',
            technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
            features: ['Multi-page SPA', 'Premium UI/UX', 'Animations', 'Responsive design', 'Modern architecture'],
            link: 'https://github.com/ShaikNagurSharifS/bio-frontend',
            status: 'In Progress',
            color: 'from-violet-500 to-purple-500'
        },
        {
            title: 'UI Automation Framework (Playwright + TypeScript)',
            category: 'Test Automation',
            description: 'Built hybrid framework using POM + BDD with reusable page objects, hooks, utilities, parallel execution, and cross-browser testing.',
            image: '🎭',
            technologies: ['Playwright', 'TypeScript', 'Cucumber', 'POM', 'Allure Reports'],
            features: ['Parallel execution', 'Cross-browser testing', 'Page Object Model', 'BDD scenarios', 'HTML/Allure reports'],
            link: 'https://playwright.dev/',
            status: 'Live',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'API Automation (Python Pytest + GraphQL)',
            category: 'API Testing',
            description: 'Automated GraphQL queries and mutations with schema validation, authentication handling, parameterized test data, and API → DB validation.',
            image: '📡',
            technologies: ['Python', 'Pytest', 'GraphQL', 'Requests', 'Authentication'],
            features: ['GraphQL testing', 'Schema validation', 'Auth handling', 'Parameterized tests', 'API-DB validation'],
            link: 'https://graphql.org/',
            status: 'Live',
            color: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Database Testing Framework',
            category: 'Data Validation',
            description: 'Validated data in PostgreSQL & DynamoDB using Python + SQL queries. TypeORM for DB comparison and replicated tables for tracking user activities.',
            image: '🗄️',
            technologies: ['PostgreSQL', 'DynamoDB', 'Python', 'TypeORM', 'SQL'],
            features: ['Data validation', 'Query execution', 'DB comparison', 'Activity tracking', 'Automated assertions'],
            link: 'https://www.postgresql.org/',
            status: 'Live',
            color: 'from-green-500 to-emerald-500'
        },
        {
            title: 'SIT/UAT Regression Suite Automation',
            category: 'E2E Testing',
            description: 'Automated critical business flows reducing manual effort by 40%. Helped faster release delivery under 2-day SIT timelines.',
            image: '🔄',
            technologies: ['Selenium', 'Java', 'TestNG', 'Maven', 'Jenkins'],
            features: ['Business flow automation', 'Regression testing', 'Fast execution', 'CI/CD integration', '40% time saved'],
            link: 'https://www.selenium.dev/',
            status: 'Live',
            color: 'from-orange-500 to-red-500'
        },
        {
            title: 'Backend & Frontend Bug Fix Contribution',
            category: 'Cross-Functional',
            description: 'Identified code-level issues, fixed minor backend logic mismatches and UI alignment bugs, supporting developers to close issues faster.',
            image: '🔧',
            technologies: ['Node.js', 'Python', 'React', 'TypeScript', 'Git'],
            features: ['Backend debugging', 'Frontend fixes', 'Log analysis', 'Code-level fixes', 'Developer support'],
            link: 'https://github.com/',
            status: 'Live',
            color: 'from-indigo-500 to-blue-500'
        }
    ]

    return (
        <div className="min-h-screen page-bg">
            <motion.main initial="hidden" animate="show" variants={stagger} className="max-layout px-6 py-12">
                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold gradient-text from-primary-400 to-accent-500 mb-6 text-center">
                    Featured Projects
                </motion.h1>
                <motion.p variants={fadeIn} className="text-center text-white/70 text-lg max-w-2xl mx-auto mb-12">
                    Test automation projects and full-stack applications built with modern frameworks and best practices.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-8 max-w-10xl mx-auto">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            className="project-card glass-card overflow-hidden group"
                        >
                            <div className={`project-header bg-linear-to-br ${project.color} p-8 text-center relative overflow-hidden`}>
                                <div className="project-icon text-6xl mb-2">{project.image}</div>
                                <span className={`project-status ${project.status === 'Live' ? 'status-live' : project.status === 'Beta' ? 'status-beta' : 'status-progress'}`}>
                                    {project.status}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="text-primary-400 text-sm font-semibold mb-2">{project.category}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                                <p className="text-white/70 text-sm mb-4 leading-relaxed">{project.description}</p>
                                <div className="mb-4">
                                    <h4 className="text-white text-sm font-semibold mb-2">Key Features:</h4>
                                    <ul className="text-white/60 text-xs space-y-1">
                                        {project.features.map((feature, i) => (
                                            <li key={i}>• {feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <h4 className="text-white text-sm font-semibold mb-2">Tech Stack:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech-badge-sm">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <a
                                    href={project.link}
                                    onClick={(e) => handleProjectClick(project, e)}
                                    className="project-link cursor-pointer"
                                >
                                    View Project →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div variants={fadeIn} className="mt-16 text-center">
                    <div className="glass-card p-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-4">Looking for QA Automation or Full-Stack Expertise?</h2>
                        <p className="text-white/70 mb-6">
                            I'm available for SDET roles, full-stack development positions, automation consulting, and freelance projects. Let's build quality software together.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-3 bg-linear-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-semibold"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </motion.div>
            </motion.main>

            {/* Project Details Modal */}
            {selectedProject && (
                <ProjectDetailsModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setTimeout(() => setSelectedProject(null), 300)
                    }}
                    project={selectedProject}
                />
            )}
        </div>
    )
}
