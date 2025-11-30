import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from './Modal'
import AuthModal from './AuthModal'
import toast from 'react-hot-toast'

interface ProjectDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    project: {
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
}

export default function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
    const [isStarred, setIsStarred] = useState(false)

    const checkAuth = () => {
        const user = localStorage.getItem('user')
        return user !== null
    }

    const handleStarProject = () => {
        if (!checkAuth()) {
            toast.error('Please sign in to star projects')
            setShowAuthModal(true)
            setAuthMode('signin')
            return
        }

        setIsStarred(!isStarred)
        toast.success(isStarred ? 'Removed from favorites' : 'Added to favorites ⭐')
    }

    const handleViewDemo = () => {
        if (project.title === 'Full-Stack Portfolio Website') {
            // For the portfolio project, show current localhost URL
            const currentUrl = window.location.origin
            toast.success(`You're already viewing it! 🎉`)
            window.open(currentUrl, '_blank')
        } else {
            window.open(project.link, '_blank')
        }
    }

    const handleCloneRepo = () => {
        if (!checkAuth()) {
            toast.error('Please sign in to clone repositories')
            setShowAuthModal(true)
            setAuthMode('signin')
            return
        }

        // Copy clone command to clipboard
        const cloneCommand = `git clone ${project.link}`
        navigator.clipboard.writeText(cloneCommand)
        toast.success('Clone command copied to clipboard! 📋')
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: project.title,
                text: project.description,
                url: project.link
            }).then(() => {
                toast.success('Shared successfully!')
            }).catch(() => {
                fallbackShare()
            })
        } else {
            fallbackShare()
        }
    }

    const fallbackShare = () => {
        navigator.clipboard.writeText(project.link)
        toast.success('Project link copied to clipboard!')
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={project.title}
                size="lg"
            >
                <div className="space-y-6">
                    {/* Project Header */}
                    <div className={`bg-linear-to-br ${project.color} p-6 rounded-xl text-center relative overflow-hidden`}>
                        <div className="text-7xl mb-3">{project.image}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${project.status === 'Live' ? 'bg-green-500/20 text-green-300' :
                            project.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-blue-500/20 text-blue-300'
                            }`}>
                            {project.status}
                        </span>
                        <div className="mt-2 text-sm text-white/80 font-semibold">{project.category}</div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStarProject}
                            className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span className="text-2xl">{isStarred ? '⭐' : '☆'}</span>
                            <span className="text-xs text-white/70">Star</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShare}
                            className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span className="text-2xl">🔗</span>
                            <span className="text-xs text-white/70">Share</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCloneRepo}
                            className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span className="text-2xl">📦</span>
                            <span className="text-xs text-white/70">Clone</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                toast('Coming soon! Download feature in development')
                            }}
                            className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <span className="text-2xl">💾</span>
                            <span className="text-xs text-white/70">Download</span>
                        </motion.button>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">About This Project</h3>
                        <p className="text-white/70 leading-relaxed">{project.description}</p>
                        {project.title === 'Full-Stack Portfolio Website' && (
                            <div className="mt-4 p-4 bg-primary-500/10 border border-primary-500/20 rounded-lg">
                                <p className="text-primary-300 text-sm">
                                    🎯 <strong>You're currently viewing this project!</strong> This portfolio website features
                                    toast notifications, authentication modals, and fully responsive design up to 2560px width.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Key Features */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-white/70">
                                    <span className="text-primary-400 mt-1">✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg text-primary-300 text-sm font-semibold"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleViewDemo}
                            className="flex-1 px-6 py-3 bg-linear-to-r from-primary-500 to-accent-500 text-white rounded-lg font-semibold"
                        >
                            View Live Demo →
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition-colors"
                        >
                            Close
                        </motion.button>
                    </div>
                </div>
            </Modal>

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                mode={authMode}
                onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            />
        </>
    )
}
