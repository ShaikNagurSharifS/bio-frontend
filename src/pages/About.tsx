import { motion } from 'framer-motion'
import '../styles/landing.css'

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
    show: { transition: { staggerChildren: 0.1 } }
}

export default function About() {
    return (
        <div className="min-h-screen page-bg">
            <motion.main initial="hidden" animate="show" variants={stagger} className="max-layout px-6 py-12">
                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold gradient-text from-primary-400 to-accent-500 mb-12 text-center">
                    About Me
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 3xl:grid-cols-3 gap-8 3xl:gap-12 max-w-10xl mx-auto">
                    {/* Bio Tile */}
                    <motion.div variants={fadeIn} className="lg:col-span-2 glass-card p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl shrink-0">
                                👨‍💻
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Shaik Nagur Sharif</h2>
                                <p className="text-primary-400 font-semibold">SDET / QA Automation Engineer + Full-Stack Developer</p>
                            </div>
                        </div>
                        <p className="text-white/80 leading-relaxed mb-4">
                            I'm an SDET with 3+ years of experience working on UI Automation, API Testing, Database Testing, and backend debugging.
                            I'm also currently building full-stack applications, working with React, Node.js, TypeScript, AWS, and modern web technologies.
                        </p>
                        <p className="text-white/80 leading-relaxed mb-4">
                            In my projects, I handle automation framework development, UI + API + DB testing, debugging backend issues,
                            AND currently developing full-stack features. I fix backend bugs, build frontend components, and work closely with Dev, TPM, and APM teams.
                            I've handled SIT, UAT, regression testing, and feature development under tight deadlines.
                        </p>
                        <p className="text-white/80 leading-relaxed mb-6">
                            I enjoy learning, solving technical challenges, and contributing beyond my role. Currently building a full-stack app
                            while maintaining test automation expertise. A versatile engineer who can test, debug, automate, AND develop.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="glass-card-inner p-4">
                                <div className="text-accent-400 font-bold text-xl mb-1">60%+</div>
                                <div className="text-white/70 text-sm">Automation Coverage</div>
                            </div>
                            <div className="glass-card-inner p-4">
                                <div className="text-primary-400 font-bold text-xl mb-1">40%</div>
                                <div className="text-white/70 text-sm">Manual Testing Reduced</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Radar */}
                    <motion.div variants={fadeIn} className="glass-card p-6">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Core Expertise</h3>
                        <div className="skill-radar-container">
                            <div className="skill-item">
                                <div className="skill-label">UI Automation</div>
                                <div className="skill-bar">
                                    <div className="skill-fill" style={{ width: '95%' }}></div>
                                </div>
                                <div className="skill-percent">95%</div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-label">API Testing</div>
                                <div className="skill-bar">
                                    <div className="skill-fill" style={{ width: '92%' }}></div>
                                </div>
                                <div className="skill-percent">92%</div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-label">DB Testing</div>
                                <div className="skill-bar">
                                    <div className="skill-fill" style={{ width: '88%' }}></div>
                                </div>
                                <div className="skill-percent">88%</div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-label">Backend Debug</div>
                                <div className="skill-bar">
                                    <div className="skill-fill" style={{ width: '85%' }}></div>
                                </div>
                                <div className="skill-percent">85%</div>
                            </div>
                            <div className="skill-item">
                                <div className="skill-label">Frameworks</div>
                                <div className="skill-bar">
                                    <div className="skill-fill" style={{ width: '90%' }}></div>
                                </div>
                                <div className="skill-percent">90%</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Timeline */}
                <motion.div variants={fadeIn} className="mt-12 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">Career Journey</h2>
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content glass-card p-6">
                                <div className="timeline-date">2021 - Present</div>
                                <h3 className="timeline-title">SDET / QA Automation Engineer + Full-Stack Developer</h3>
                                <p className="timeline-company">XYZ Company</p>
                                <p className="timeline-description">
                                    Built and maintained automation frameworks, automated UI, API, and DB tests.
                                    Currently developing full-stack applications with React, Node.js, and TypeScript.
                                    Worked daily with developers, APMs, and TPMs. Supported backend and frontend bug fixes.
                                    Performed SIT, UAT, and end-to-end testing under high-pressure releases.
                                </p>
                                <div className="mt-4 space-y-2 text-white/70 text-sm">
                                    <div>• Automated 60%+ of regression flows</div>
                                    <div>• Reduced manual testing time by 40%</div>
                                    <div>• Currently building full-stack applications</div>
                                    <div>• Found critical bugs preventing production issues</div>
                                    <div>• Handled multiple releases under tight timelines</div>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content glass-card p-6">
                                <div className="timeline-date">2019 - 2021</div>
                                <h3 className="timeline-title">Junior QA Engineer</h3>
                                <p className="timeline-company">ABC Tech Solutions</p>
                                <p className="timeline-description">
                                    Started career in software testing, learning automation fundamentals and testing methodologies.
                                    Gained hands-on experience with manual testing and transitioning to automation.
                                </p>
                                <div className="mt-4 space-y-2 text-white/70 text-sm">
                                    <div>• Performed manual and exploratory testing</div>
                                    <div>• Learned Selenium and automation basics</div>
                                    <div>• Participated in agile development processes</div>
                                    <div>• Contributed to test documentation</div>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content glass-card p-6">
                                <div className="timeline-date">2018 - 2019</div>
                                <h3 className="timeline-title">QA Intern</h3>
                                <p className="timeline-company">Tech Startup Inc.</p>
                                <p className="timeline-description">
                                    Internship focused on learning software testing principles, bug tracking, and quality assurance processes.
                                    First exposure to real-world software development lifecycle.
                                </p>
                                <div className="mt-4 space-y-2 text-white/70 text-sm">
                                    <div>• Learned testing fundamentals</div>
                                    <div>• Assisted in manual testing efforts</div>
                                    <div>• Used bug tracking tools (Jira)</div>
                                    <div>• Shadowed senior QA engineers</div>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-marker"></div>
                            <div className="timeline-content glass-card p-6">
                                <div className="timeline-date">2015 - 2019</div>
                                <h3 className="timeline-title">B.Tech in Computer Science</h3>
                                <p className="timeline-company">University Name</p>
                                <p className="timeline-description">
                                    Completed Bachelor's degree in Computer Science Engineering.
                                    Built foundation in programming, algorithms, and software development principles.
                                </p>
                                <div className="mt-4 space-y-2 text-white/70 text-sm">
                                    <div>• Core CS fundamentals and programming</div>
                                    <div>• Data structures and algorithms</div>
                                    <div>• Software engineering principles</div>
                                    <div>• Academic projects and coursework</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Education & Certifications */}
                <motion.div variants={fadeIn} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <div className="glass-card p-6">
                        <h3 className="text-2xl font-bold text-white mb-6">🎓 Education</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="font-semibold text-white">B.Tech in Computer Science</div>
                                <div className="text-white/70">University Name • 2015 - 2019</div>
                            </div>
                        </div>
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="text-2xl font-bold text-white mb-6">🏆 Certifications</h3>
                        <div className="space-y-3 text-white/80">
                            <div>• Python Basics</div>
                            <div>• Java Fundamentals</div>
                            <div>• Postman API Testing</div>
                            <div>• Agile Testing Methodologies</div>
                        </div>
                    </div>
                </motion.div>
            </motion.main>
        </div>
    )
}
