import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import '../styles/landing.css'

const parentVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
}

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.2, 0.9, 0.2, 1] } }
}

export default function Landing() {
    const parentRef = useRef<HTMLDivElement | null>(null)
    const [isAtBottom, setIsAtBottom] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const docHeight = document.documentElement.scrollHeight

            // Consider at bottom if within 100px of bottom
            setIsAtBottom(scrollTop + windowHeight >= docHeight - 100)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial position

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScrollClick = () => {
        if (isAtBottom) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })
        }
    }

    return (
        <div className="min-h-screen landing-hero-bg relative">
            <motion.main ref={parentRef} initial="hidden" animate="show" variants={parentVariants} className="max-layout py-4">

                <h3 className="text-center text-3xl md:text-5xl font-bold italic text-yellow-400 mb-3 md:mb-4">Hi, I'm Shaik Nagur Sharif 👋</h3>

                <section className="relative mt-3 stagger-parent py-2">
                    <div className="avatar-wrap flex justify-center items-center">
                        <div className="stat left-stat">
                            <motion.div className="stat-card glass-card flash-highlight" variants={childVariants}>
                                <div className="title text-sm uppercase tracking-wide">Frameworks</div>
                                <div className="value text-primary-400">5+</div>
                            </motion.div>
                        </div>

                        <motion.div className="avatar" variants={childVariants}>
                            <div className="avatar-ring" />
                            <motion.img src="/3dstudentAvatar.png" alt="Shaik Nagur Sharif" className="avatar-img" initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }} />
                        </motion.div>

                        <div className="stat right-stat">
                            <motion.div className="stat-card glass-card flash-highlight" variants={childVariants}>
                                <div className="title text-sm uppercase tracking-wide">Experience</div>
                                <div className="value text-accent-400">3+ yrs</div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="text-center space-y-3 stagger-parent">
                    <motion.h1 variants={childVariants} className="text-5xl md:text-7xl font-bold gradient-text from-primary-400 to-accent-500 mt-2 md:mt-3 mb-2">
                        Shaik Nagur Sharif
                    </motion.h1>
                    <motion.p variants={childVariants} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                        SDET / QA Automation Engineer + Full-Stack Developer (3+ Years)
                    </motion.p>
                    <motion.p variants={childVariants} className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                        I build automation frameworks, test complex systems, AND currently developing full-stack applications.
                        I support backend & frontend teams, debug code, fix issues, and ensure quality delivery under tough timelines.
                    </motion.p>
                    <div className="flex gap-4 justify-center flex-wrap pt-3">
                        <motion.a
                            variants={childVariants}
                            href="/Shaik_Nagur_Sharif_Resume.pdf"
                            download="Shaik_Nagur_Sharif_Resume.pdf"
                            className="px-8 py-3 bg-linear-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-semibold"
                        >
                            Download CV
                        </motion.a>
                        <motion.a
                            variants={childVariants}
                            href="/contact"
                            className="px-8 py-3 border-2 border-white/20 text-white rounded-xl hover:bg-white/5 hover:border-primary-400 transition-all duration-300 font-semibold"
                        >
                            Get In Touch
                        </motion.a>
                    </div>
                </section>

                <section className="mt-8 stagger-parent">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-white/90 mb-4">Tech Stack</h2>
                    <div className="flex gap-3 md:gap-4 justify-center flex-wrap max-w-5xl mx-auto">
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">⚛️</span>
                            <span className="tech-name">React</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">📘</span>
                            <span className="tech-name">TypeScript</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">🟢</span>
                            <span className="tech-name">Node.js</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">☁️</span>
                            <span className="tech-name">AWS</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">🐍</span>
                            <span className="tech-name">Python</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">🗄️</span>
                            <span className="tech-name">PostgreSQL</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">🎭</span>
                            <span className="tech-name">Playwright</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">🔧</span>
                            <span className="tech-name">Selenium</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">📮</span>
                            <span className="tech-name">Postman</span>
                        </motion.div>
                        <motion.div variants={childVariants} className="tech-tile glass-card">
                            <span className="tech-icon">◎</span>
                            <span className="tech-name">GraphQL</span>
                        </motion.div>
                    </div>
                </section>

                <section className="mt-10 max-w-5xl mx-auto">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-white/90 mb-5">Quick Stats</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 gap-4 3xl:gap-6">
                        <motion.div variants={childVariants} className="stat-box glass-card text-center">
                            <div className="stat-number gradient-text from-primary-400 to-accent-500">60%+</div>
                            <div className="stat-label">Test Automation</div>
                        </motion.div>
                        <motion.div variants={childVariants} className="stat-box glass-card text-center">
                            <div className="stat-number gradient-text from-primary-400 to-accent-500">3+</div>
                            <div className="stat-label">Years Experience</div>
                        </motion.div>
                        <motion.div variants={childVariants} className="stat-box glass-card text-center">
                            <div className="stat-number gradient-text from-primary-400 to-accent-500">10+</div>
                            <div className="stat-label">Frameworks Built</div>
                        </motion.div>
                        <motion.div variants={childVariants} className="stat-box glass-card text-center">
                            <div className="stat-number gradient-text from-primary-400 to-accent-500">40%</div>
                            <div className="stat-label">Time Saved</div>
                        </motion.div>
                    </div>
                </section>

                <section className="mt-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">Explore My Work</h2>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/projects" className="cta-tile glass-card hover:scale-105 transition-transform">
                            <div className="cta-icon">💼</div>
                            <div className="cta-label">View Projects</div>
                        </Link>
                        <Link to="/skills" className="cta-tile glass-card hover:scale-105 transition-transform">
                            <div className="cta-icon">🎯</div>
                            <div className="cta-label">Skills & Expertise</div>
                        </Link>
                        <Link to="/experience" className="cta-tile glass-card hover:scale-105 transition-transform">
                            <div className="cta-icon">📈</div>
                            <div className="cta-label">Career Journey</div>
                        </Link>
                    </div>
                </section>
            </motion.main>

            {/* Scroll Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={handleScrollClick}
                className="scroll-down-btn"
                aria-label={isAtBottom ? "Scroll to top" : "Scroll down"}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {isAtBottom ? (
                        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                        <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    )}
                </svg>
            </motion.button>
        </div>
    )
}
