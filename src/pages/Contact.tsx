import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import '../styles/landing.css'

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
    show: { transition: { staggerChildren: 0.1 } }
}

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields')
            return
        }

        // Success toast
        toast.success('Message sent successfully! I will get back to you soon.')
        console.log('Form submitted:', formData)

        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    const contactInfo = [
        { icon: '📧', label: 'Email', value: 'shaiknagursharif@gmail.com', link: 'mailto:shaiknagursharif@gmail.com' },
        { icon: '📍', label: 'Location', value: 'India', link: '#' },
        { icon: '👨‍💻', label: 'LinkedIn', value: 'linkedin.com/in/shaiknagursharif', link: 'https://www.linkedin.com/in/shaiknagursharif' },
        { icon: '🐱', label: 'GitHub', value: 'github.com/ShaikNagurSharifS', link: 'https://github.com/ShaikNagurSharifS' }
    ]

    return (
        <div className="min-h-screen page-bg">
            <motion.main initial="hidden" animate="show" variants={stagger} className="max-layout px-6 py-12">
                <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold gradient-text from-primary-400 to-accent-500 mb-6 text-center">
                    Get In Touch
                </motion.h1>
                <motion.p variants={fadeIn} className="text-center text-white/70 text-lg max-w-2xl mx-auto mb-12">
                    Looking for QA Automation or Full-Stack Development expertise? Let's collaborate and build quality software together!
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 3xl:gap-12 max-w-10xl mx-auto">
                    {/* Contact Info Cards */}
                    <motion.div variants={fadeIn} className="lg:col-span-1 space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.link}
                                variants={fadeIn}
                                className="contact-info-card glass-card p-4 flex items-center gap-4 hover:scale-105 transition-transform"
                            >
                                <div className="contact-icon text-3xl">{info.icon}</div>
                                <div className="flex-1">
                                    <div className="text-white/60 text-sm">{info.label}</div>
                                    <div className="text-white font-semibold">{info.value}</div>
                                </div>
                            </motion.a>
                        ))}

                        <div className="glass-card p-6 mt-8">
                            <h3 className="text-white font-bold mb-4">Social Links</h3>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/in/shaiknagursharif" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">👨‍💻</a>
                                <a href="https://github.com/ShaikNagurSharifS" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">🐱</a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" title="Twitter">🐦</a>
                                <a href="mailto:shaiknagursharif@gmail.com" className="social-icon" title="Email">📧</a>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <h3 className="text-white font-bold mb-2">Availability</h3>
                            <div className="flex items-center gap-2 text-green-400">
                                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                                <span>Available for SDET & Full-Stack roles</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div variants={fadeIn} className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="floating-input"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="name" className="floating-label">Your Name</label>
                            </div>

                            <div className="floating-input-group">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="floating-input"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="email" className="floating-label">Your Email</label>
                            </div>

                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="floating-input"
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="subject" className="floating-label">Subject</label>
                            </div>

                            <div className="floating-input-group">
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="floating-input"
                                    placeholder=" "
                                    rows={5}
                                    required
                                />
                                <label htmlFor="message" className="floating-label">Your Message</label>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-4 bg-linear-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold text-lg hover:shadow-neon-lg transition-all duration-300"
                            >
                                Send Message →
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Quick Stats */}
                <motion.div variants={fadeIn} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <div className="glass-card p-6 text-center">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="text-white/70 text-sm">Fast Response</div>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-3xl mb-2">🌐</div>
                        <div className="text-white/70 text-sm">Global Reach</div>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-3xl mb-2">🔒</div>
                        <div className="text-white/70 text-sm">Secure & Private</div>
                    </div>
                    <div className="glass-card p-6 text-center">
                        <div className="text-3xl mb-2">🤝</div>
                        <div className="text-white/70 text-sm">Let's Collaborate</div>
                    </div>
                </motion.div>
            </motion.main>
        </div>
    )
}
