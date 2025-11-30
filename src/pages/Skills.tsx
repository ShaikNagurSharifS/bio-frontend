import { motion } from 'framer-motion'
import { useState } from 'react'
import '../styles/landing.css'

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
    show: { transition: { staggerChildren: 0.1 } }
}

type SkillCategory = 'automation' | 'api-testing' | 'fullstack' | 'database' | 'tools'

export default function Skills() {
    const [activeTab, setActiveTab] = useState<SkillCategory>('automation')

    const skills = {
        automation: [
            { name: 'Playwright', level: 95, icon: '🎭' },
            { name: 'Selenium', level: 92, icon: '🔧' },
            { name: 'PyTest', level: 90, icon: '🐍' },
            { name: 'Cucumber BDD', level: 88, icon: '🥒' },
            { name: 'Java TestNG', level: 85, icon: '☕' },
            { name: 'Hybrid Framework', level: 93, icon: '⚙️' }
        ],
        'api-testing': [
            { name: 'Postman', level: 95, icon: '📮' },
            { name: 'REST APIs', level: 93, icon: '🔌' },
            { name: 'GraphQL', level: 88, icon: '◎' },
            { name: 'Python Requests', level: 90, icon: '🐍' },
            { name: 'API Authentication', level: 87, icon: '🔐' },
            { name: 'Schema Validation', level: 85, icon: '✓' }
        ],
        fullstack: [
            { name: 'React', level: 90, icon: '⚛️' },
            { name: 'Python', level: 92, icon: '🐍' },
            { name: 'TypeScript', level: 92, icon: '📘' },
            { name: 'FastAPI', level: 90, icon: '⚡' },
            { name: 'Graphene (GraphQL)', level: 88, icon: '◎' },
            { name: 'REST APIs', level: 93, icon: '🔌' }
        ],
        database: [
            { name: 'PostgreSQL', level: 90, icon: '🟁' },
            { name: 'DynamoDB', level: 85, icon: '⚡' },
            { name: 'MongoDB', level: 82, icon: '🍃' },
            { name: 'TypeORM', level: 88, icon: '📘' },
            { name: 'SQL Queries', level: 93, icon: '🗄️' },
            { name: 'Data Validation', level: 90, icon: '📋' }
        ],
        tools: [
            { name: 'Git/GitHub', level: 95, icon: '🔧' },
            { name: 'VS Code', level: 98, icon: '💻' },
            { name: 'IntelliJ IDEA', level: 90, icon: '☕' },
            { name: 'AWS', level: 82, icon: '☁️' },
            { name: 'DBeaver', level: 88, icon: '🗄️' },
            { name: 'Jira', level: 92, icon: '📋' }
        ]
    }

    return (
        <div className="min-h-screen page-bg">
            <motion.main initial="hidden" animate="show" variants={stagger} className="max-layout px-6 py-12">
                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold gradient-text from-primary-400 to-accent-500 mb-12 text-center">
                    Skills & Expertise
                </motion.h1>

                {/* Category Tabs */}
                <motion.div variants={fadeIn} className="flex gap-3 justify-center flex-wrap mb-12">
                    {(['automation', 'api-testing', 'fullstack', 'database', 'tools'] as SkillCategory[]).map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`skill-tab glass-card px-6 py-3 font-semibold capitalize transition-all ${activeTab === category ? 'active' : ''
                                }`}
                        >
                            {category === 'api-testing' ? 'API Testing' : category === 'fullstack' ? 'Full-Stack' : category}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6 max-w-10xl mx-auto">
                    {skills[activeTab].map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="skill-card glass-card p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">{skill.icon}</span>
                                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                            </div>
                            <div className="skill-bar-container">
                                <div className="skill-bar-bg">
                                    <motion.div
                                        className="skill-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                                    />
                                </div>
                                <div className="skill-percentage">{skill.level}%</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Proficiency Overview */}
                <motion.div variants={fadeIn} className="mt-16 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Proficiency Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Core Strengths</h3>
                            <div className="space-y-4">
                                <div className="proficiency-item">
                                    <span className="proficiency-label">Test Automation</span>
                                    <div className="proficiency-bar">
                                        <motion.div
                                            className="proficiency-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '95%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                                <div className="proficiency-item">
                                    <span className="proficiency-label">API Testing</span>
                                    <div className="proficiency-bar">
                                        <motion.div
                                            className="proficiency-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '92%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                                <div className="proficiency-item">
                                    <span className="proficiency-label">Database Testing</span>
                                    <div className="proficiency-bar">
                                        <motion.div
                                            className="proficiency-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '88%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                                <div className="proficiency-item">
                                    <span className="proficiency-label">Backend Debugging</span>
                                    <div className="proficiency-bar">
                                        <motion.div
                                            className="proficiency-fill"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '85%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">Soft Skills</h3>
                            <div className="space-y-4 text-white/80">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🎯</span>
                                    <span>Problem Solving & Debugging</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">👥</span>
                                    <span>Cross-Team Collaboration</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📢</span>
                                    <span>Effective Communication</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">⚡</span>
                                    <span>Agile Testing Methodologies</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📚</span>
                                    <span>Continuous Learning</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">⏱️</span>
                                    <span>Deadline Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.main>
        </div>
    )
}
