import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { validateEmail, validatePassword } from '../utils/validation'

export default function SignIn() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        twoFactorCode: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [requires2FA, setRequires2FA] = useState(false)
    const [loginAttempts, setLoginAttempts] = useState(0)
    const [isLocked, setIsLocked] = useState(false)
    const [lockoutTime, setLockoutTime] = useState(0)

    // Check if user is already logged in
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            navigate('/')
        }
    }, [navigate])

    // Lockout timer
    useEffect(() => {
        if (lockoutTime > 0) {
            const timer = setInterval(() => {
                setLockoutTime(prev => {
                    if (prev <= 1) {
                        setIsLocked(false)
                        setLoginAttempts(0)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [lockoutTime])

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error!
        }

        const passwordValidation = validatePassword(formData.password)
        if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.error!
        }

        if (requires2FA && !formData.twoFactorCode) {
            newErrors.twoFactorCode = '2FA code is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (isLocked) {
            toast.error(`Account locked. Please wait ${lockoutTime} seconds.`)
            return
        }

        if (!validateForm()) {
            toast.error('Please fix the errors in the form')
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            // Simulate failed login (for demo)
            const isSuccess = Math.random() > 0.3 // 70% success rate for demo

            if (isSuccess) {
                // Check if 2FA is required (simulate)
                if (!requires2FA && Math.random() > 0.7) {
                    setRequires2FA(true)
                    setIsLoading(false)
                    toast.success('2FA code sent to your email/phone')
                    return
                }

                // Successful login
                const userData = {
                    name: formData.email.split('@')[0],
                    email: formData.email,
                    loginTime: new Date().toISOString()
                }

                if (formData.rememberMe) {
                    localStorage.setItem('rememberMe', 'true')
                }

                localStorage.setItem('user', JSON.stringify(userData))
                toast.success('Welcome back! Login successful.')

                // Redirect to home
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            } else {
                // Failed login
                const newAttempts = loginAttempts + 1
                setLoginAttempts(newAttempts)

                if (newAttempts >= 5) {
                    setIsLocked(true)
                    setLockoutTime(300) // 5 minutes lockout
                    toast.error('Too many failed attempts. Account locked for 5 minutes.')
                } else {
                    toast.error(`Invalid credentials. ${5 - newAttempts} attempts remaining.`)
                }
                setIsLoading(false)
            }
        }, 1500)
    }

    const handleSocialLogin = (provider: string) => {
        toast.success(`${provider} authentication would redirect here`)
    }

    const handleForgotPassword = () => {
        if (!formData.email) {
            toast.error('Please enter your email first')
            return
        }
        const emailValidation = validateEmail(formData.email)
        if (!emailValidation.isValid) {
            toast.error('Please enter a valid email')
            return
        }
        toast.success('Password reset link sent to your email')
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 landing-hero-bg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-8"
            >
                <div className="glass-card p-8 rounded-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-primary-500 to-accent-500 shadow-neon">
                                <img src="/3dstudentAvatar.png" alt="logo" className="w-10 h-10 rounded-full" />
                            </div>
                            <span className="text-2xl font-bold glass-text">Shaik Nagur Sharif</span>
                        </Link>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-white/60">Sign in to your account</p>
                    </div>

                    {/* Security Notice */}
                    {isLocked && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-red-300 font-semibold">Account Temporarily Locked</p>
                                    <p className="text-red-400/80 text-sm">Please wait {Math.floor(lockoutTime / 60)}:{(lockoutTime % 60).toString().padStart(2, '0')} minutes</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Login */}
                    <div className="space-y-3 mb-6">
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('Google')}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-white font-medium">Continue with Google</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocialLogin('GitHub')}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-white font-medium">Continue with GitHub</span>
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[#19254b] text-white/60">Or continue with email</span>
                        </div>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-white/80 text-sm font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value })
                                    setErrors({ ...errors, email: '' })
                                }}
                                disabled={isLocked}
                                className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'
                                    } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-white/80 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value })
                                        setErrors({ ...errors, password: '' })
                                    }}
                                    disabled={isLocked}
                                    className={`w-full px-4 py-3 pr-12 bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'
                                        } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                            )}
                        </div>

                        {/* 2FA Code (conditional) */}
                        {requires2FA && (
                            <div>
                                <label className="block text-white/80 text-sm font-semibold mb-2">
                                    Two-Factor Authentication Code
                                </label>
                                <input
                                    type="text"
                                    value={formData.twoFactorCode}
                                    onChange={(e) => {
                                        setFormData({ ...formData, twoFactorCode: e.target.value })
                                        setErrors({ ...errors, twoFactorCode: '' })
                                    }}
                                    maxLength={6}
                                    className={`w-full px-4 py-3 bg-white/5 border ${errors.twoFactorCode ? 'border-red-500/50' : 'border-white/10'
                                        } rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary-400 transition-colors text-center text-xl tracking-widest`}
                                    placeholder="000000"
                                    autoComplete="one-time-code"
                                />
                                {errors.twoFactorCode && (
                                    <p className="mt-1 text-sm text-red-400">{errors.twoFactorCode}</p>
                                )}
                                <p className="mt-2 text-xs text-white/60">
                                    Enter the 6-digit code from your authenticator app or SMS
                                </p>
                            </div>
                        )}

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-400"
                                />
                                <span className="text-sm text-white/80">Remember me</span>
                            </label>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading || isLocked}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-linear-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-lg shadow-neon hover:shadow-neon-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-semibold transition-colors">
                                Sign up for free
                            </Link>
                        </p>
                    </div>

                    {/* Security Info */}
                    <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="text-white/80 text-sm font-semibold">Secure Connection</p>
                                <p className="text-white/60 text-xs mt-1">
                                    Your data is encrypted and protected with industry-standard security measures.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="text-center space-y-2">
                    <p className="text-white/40 text-xs">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-primary-400 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-primary-400 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
