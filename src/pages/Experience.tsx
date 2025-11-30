import { motion } from 'framer-motion'
import '../styles/landing.css'

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
    show: { transition: { staggerChildren: 0.15 } }
}

export default function Experience() {
    const experiences = [
        {
            period: '2021 - Present',
            role: 'SDET / QA Automation Engineer + Full-Stack Developer',
            company: 'XYZ Company',
            location: 'India',
            description: 'Leading automation initiatives, building test frameworks, developing full-stack features, and supporting cross-functional teams in quality delivery.',
            achievements: [
                'Built and maintained automation frameworks for UI, API, and Database testing',
                'Developed full-stack features using React, Node.js, TypeScript, and AWS',
                'Automated 60%+ of regression flows, reducing manual testing time by 40%',
                'Built backend APIs and frontend components for production applications',
                'Worked closely with Dev, TPM, and APM teams on SIT, UAT, and production releases',
                'Fixed backend and frontend bugs when developers had bandwidth issues',
                'Analyzed logs, databases, and API flows to identify and resolve critical defects',
                'Currently building a full-stack application while maintaining test automation'
            ],
            technologies: ['React', 'Node.js', 'TypeScript', 'Playwright', 'Selenium', 'Python', 'Java', 'GraphQL', 'PostgreSQL', 'DynamoDB', 'AWS', 'Postman', 'Git', 'Jira'],
            progress: 100
        },
        {
            period: '2021 - Present',
            role: 'SDET / QA Automation Engineer + Full-Stack Developer',
            company: 'XYZ Company',
            location: 'India',
            description: 'Leading automation initiatives, building test frameworks, developing full-stack features, and supporting cross-functional teams in quality delivery.',
            achievements: [
                'Built and maintained automation frameworks for UI, API, and Database testing',
                'Developed full-stack features using React, Node.js, TypeScript, and AWS',
                'Automated 60%+ of regression flows, reducing manual testing time by 40%',
                'Built backend APIs and frontend components for production applications',
                'Worked closely with Dev, TPM, and APM teams on SIT, UAT, and production releases',
                'Fixed backend and frontend bugs when developers had bandwidth issues',
                'Analyzed logs, databases, and API flows to identify and resolve critical defects',
                'Currently building a full-stack application while maintaining test automation'
            ],
            technologies: ['React', 'Node.js', 'TypeScript', 'Playwright', 'Selenium', 'Python', 'Java', 'GraphQL', 'PostgreSQL', 'DynamoDB', 'AWS', 'Postman', 'Git', 'Jira'],
            progress: 100
        },
        {
            period: '2021 - Present',
            role: 'SDET / QA Automation Engineer + Full-Stack Developer',
            company: 'XYZ Company',
            location: 'India',
            description: 'Leading automation initiatives, building test frameworks, developing full-stack features, and supporting cross-functional teams in quality delivery.',
            achievements: [
                'Built and maintained automation frameworks for UI, API, and Database testing',
                'Developed full-stack features using React, Node.js, TypeScript, and AWS',
                'Automated 60%+ of regression flows, reducing manual testing time by 40%',
                'Built backend APIs and frontend components for production applications',
                'Worked closely with Dev, TPM, and APM teams on SIT, UAT, and production releases',
                'Fixed backend and frontend bugs when developers had bandwidth issues',
                'Analyzed logs, databases, and API flows to identify and resolve critical defects',
                'Currently building a full-stack application while maintaining test automation'
            ],
            technologies: ['React', 'Node.js', 'TypeScript', 'Playwright', 'Selenium', 'Python', 'Java', 'GraphQL', 'PostgreSQL', 'DynamoDB', 'AWS', 'Postman', 'Git', 'Jira'],
            progress: 100
        }
    ]

    return (
        <div className="min-h-screen page-bg">
            <motion.main initial="hidden" animate="show" variants={stagger} className="max-layout px-6 py-12">
                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold gradient-text from-primary-400 to-accent-500 mb-12 text-center">
                    Professional Experience
                </motion.h1>

                <div className="experience-timeline max-w-5xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            className="experience-item"
                        >
                            <div className="experience-marker">
                                <div className="experience-dot"></div>
                                <div className="experience-line"></div>
                            </div>
                            <div className="experience-content glass-card p-8">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <div className="experience-period">{exp.period}</div>
                                        <h2 className="experience-role">{exp.role}</h2>
                                        <div className="experience-company">{exp.company} • {exp.location}</div>
                                    </div>
                                    <div className="progress-circle">
                                        <svg width="80" height="80" viewBox="0 0 80 80">
                                            <circle cx="40" cy="40" r="35" className="progress-bg" />
                                            <motion.circle
                                                cx="40"
                                                cy="40"
                                                r="35"
                                                className="progress-bar"
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: exp.progress / 100 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                            <text x="40" y="45" textAnchor="middle" className="progress-text">
                                                {exp.progress}%
                                            </text>
                                        </svg>
                                    </div>
                                </div>
                                <p className="experience-description">{exp.description}</p>
                                <div className="mt-6">
                                    <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                                    <ul className="experience-achievements">
                                        {exp.achievements.map((achievement, i) => (
                                            <li key={i}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-6">
                                    <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, i) => (
                                            <span key={i} className="tech-badge">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Summary */}
                <motion.div variants={fadeIn} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl font-bold gradient-text from-primary-400 to-accent-500 mb-2">3+</div>
                        <div className="text-white/70">Years Experience</div>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl font-bold gradient-text from-primary-400 to-accent-500 mb-2">10+</div>
                        <div className="text-white/70">Frameworks Built</div>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl font-bold gradient-text from-primary-400 to-accent-500 mb-2">60%+</div>
                        <div className="text-white/70">Automation</div>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-4xl font-bold gradient-text from-primary-400 to-accent-500 mb-2">40%</div>
                        <div className="text-white/70">Time Saved</div>
                    </div>
                </motion.div>
            </motion.main>
        </div>
    )
}
