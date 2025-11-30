import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import AuthModal from './AuthModal'

export default function Header() {
    const [open, setOpen] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
    interface User { name?: string; email?: string }
    const [user, setUser] = useState<User | null>(() => {
        try {
            const s = localStorage.getItem('user')
            return s ? JSON.parse(s) as User : null
        } catch {
            return null
        }
    })
    const panelRef = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)

    // Note: initial user is read in useState initializer to avoid setState during render effects.

    // Listen for storage changes (user login/logout)
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user')
            setUser(storedUser ? JSON.parse(storedUser) : null)
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    const handleSignOut = () => {
        localStorage.removeItem('user')
        setUser(null)
        toast.success('Signed out successfully')
    }

    const openAuthModal = (mode: 'signin' | 'signup') => {
        setAuthMode(mode)
        setShowAuthModal(true)
    }

    // when panel becomes visible, trigger entrance animation
    useEffect(() => {
        if (!visible) return
        const id = window.setTimeout(() => panelRef.current?.classList.add('open'), 10)
        return () => clearTimeout(id)
    }, [visible])

    // when open becomes false, start closing animation and unmount after delay
    useEffect(() => {
        if (open) return
        if (!visible || !panelRef.current) return
        panelRef.current.classList.remove('open')
        panelRef.current.classList.add('closing')
        const id = window.setTimeout(() => setVisible(false), 280)
        return () => clearTimeout(id)
    }, [open, visible])

    // Accessibility: focus management and ESC-to-close
    const triggerRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setOpen(false)
                return
            }
            if (e.key !== 'Tab' || !panelRef.current) return
            const focusable = Array.from(panelRef.current.querySelectorAll('a,button,input,textarea,select')) as HTMLElement[]
            if (!focusable.length) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        if (visible) {
            document.addEventListener('keydown', onKey)
            const t = window.setTimeout(() => {
                const el = panelRef.current?.querySelector('a,button') as HTMLElement | null
                el?.focus()
            }, 120)
            return () => {
                clearTimeout(t)
                document.removeEventListener('keydown', onKey)
            }
        }
        return () => { }
    }, [visible])

    // restore focus when closed
    useEffect(() => {
        if (!visible) {
            triggerRef.current?.focus()
        }
    }, [visible])

    // prevent background scroll when menu visible
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [visible])
    return (
        <header className="relative max-layout py-6 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-r from-primary-500 to-accent-500 shadow-neon">
                    <img src="/3dstudentAvatar.png" alt="logo" className="w-8 h-8 rounded-full" />
                </div>
                <div className="text-xl font-bold glass-text">Shaik Nagur Sharif</div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-4 text-white/80 items-center">
                <Link to="/" className="nav-tile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9bdcff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    <span>Home</span>
                </Link>
                <Link to="/about" className="nav-tile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b98bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>About</span>
                </Link>
                <Link to="/skills" className="nav-tile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9bdcff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <span>Skills</span>
                </Link>
                <Link to="/experience" className="nav-tile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b98bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <span>Experience</span>
                </Link>
                <Link to="/projects" className="nav-tile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9bdcff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Projects</span>
                </Link>
                <Link to="/contact" className="nav-tile">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b98bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>Contact</span>
                </Link>

                {/* Auth Button */}
                {user ? (
                    <div className="relative group">
                        <button className="flex items-center gap-2 nav-tile">
                            <div className="w-6 h-6 rounded-full bg-linear-to-r from-primary-500 to-accent-500 flex items-center justify-center text-xs font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span>{user.name}</span>
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="glass-card p-2 space-y-1">
                                <div className="px-3 py-2 text-white/60 text-xs border-b border-white/10">
                                    {user.email}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/5 rounded transition-colors text-sm"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => openAuthModal('signin')}
                        className="nav-tile"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9bdcff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        <span>Sign In</span>
                    </button>
                )}

                <Link to="/projects" className="btn bg-linear-to-r from-primary-500 to-accent-500 text-black px-5 py-2 rounded-lg shadow-neon font-semibold">
                    Work
                </Link>
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-3">
                <button
                    aria-controls="mobile-menu"
                    aria-expanded={open}
                    onClick={() => {
                        // open menu and mark visible to trigger animation
                        setOpen(prev => {
                            const next = !prev
                            if (next) setVisible(true)
                            return next
                        })
                    }}
                    ref={triggerRef}
                    className="p-2 rounded-md bg-white/5 hover:bg-white/10"
                >
                    <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
                    {/* simple hamburger / close icon */}
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {open ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu (full-screen drawer) */}
            {(visible || open) && (
                <div id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" className="fixed inset-0 z-50 md:hidden">
                    <button className="absolute inset-0 bg-black/60" aria-label="Close menu" onClick={() => { setOpen(false); setVisible(false) }} />
                    <div
                        ref={panelRef}
                        role="document"
                        className="absolute left-0 right-0 top-20 w-full max-w-[520px] mx-auto bg-[#071025] p-4 rounded-lg shadow-2xl drawer-panel"
                        style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div id="mobile-menu-title" className="text-lg font-semibold">Menu</div>
                            <button onClick={() => { setOpen(false); setVisible(false) }} className="p-2 rounded-md bg-white/5 hover:bg-white/10">
                                <span className="sr-only">Close menu</span>
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex flex-col gap-3 pb-3">
                            <Link onClick={() => { setOpen(false); setVisible(false) }} className="block hover:text-primary-400" to="/">Home</Link>
                            <Link onClick={() => { setOpen(false); setVisible(false) }} className="block hover:text-primary-400" to="/about">About</Link>
                            <Link onClick={() => { setOpen(false); setVisible(false) }} className="block hover:text-primary-400" to="/skills">Skills</Link>
                            <Link onClick={() => { setOpen(false); setVisible(false) }} className="block hover:text-primary-400" to="/experience">Experience</Link>
                            <Link onClick={() => { setOpen(false); setVisible(false) }} className="block hover:text-primary-400" to="/projects">Projects</Link>
                            <Link onClick={() => { setOpen(false); setVisible(false) }} className="block hover:text-primary-400" to="/contact">Contact</Link>
                            {user ? (
                                <button onClick={() => { handleSignOut(); setOpen(false); setVisible(false) }} className="block text-left hover:text-primary-400 w-full">
                                    Sign Out ({user.name})
                                </button>
                            ) : (
                                <button onClick={() => { openAuthModal('signin'); setOpen(false); setVisible(false) }} className="block text-left hover:text-primary-400 w-full">
                                    Sign In
                                </button>
                            )}
                            <Link onClick={() => setOpen(false)} className="block btn bg-linear-to-r from-primary-500 to-accent-500 text-black px-5 py-2 rounded-lg shadow-neon" to="/projects">Work</Link>
                        </nav>
                    </div>
                </div>
            )}

            {/* Auth Modal */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => {
                    setShowAuthModal(false)
                    // Refresh user state after modal closes
                    const storedUser = localStorage.getItem('user')
                    setUser(storedUser ? JSON.parse(storedUser) : null)
                }}
                mode={authMode}
                onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            />
        </header>
    )
}