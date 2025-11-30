import { useState } from 'react'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

/**
 * Example page demonstrating Modal and Toast usage
 * This file can be used as a reference for implementing modals and toasts in your application
 */

export default function ExampleModalUsage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md')

    const showSuccessToast = () => {
        toast.success('This is a success message!')
    }

    const showErrorToast = () => {
        toast.error('This is an error message!')
    }

    const showInfoToast = () => {
        toast('This is an info message')
    }

    const showLoadingToast = () => {
        const toastId = toast.loading('Processing...')
        setTimeout(() => {
            toast.success('Completed!', { id: toastId })
        }, 2000)
    }

    return (
        <div className="min-h-screen page-bg">
            <main className="max-layout px-6 py-12">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text from-primary-400 to-accent-500 mb-8 text-center">
                    Modal & Toast Examples
                </h1>

                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Toast Examples */}
                    <section className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Toast Notifications</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={showSuccessToast}
                                className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold"
                            >
                                Success
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={showErrorToast}
                                className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold"
                            >
                                Error
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={showInfoToast}
                                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold"
                            >
                                Info
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={showLoadingToast}
                                className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold"
                            >
                                Loading
                            </motion.button>
                        </div>
                    </section>

                    {/* Modal Examples */}
                    <section className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Modal Sizes</h2>
                        <div className="space-y-4">
                            <p className="text-white/70 mb-4">Select a modal size and open it:</p>
                            <div className="flex gap-3 flex-wrap mb-6">
                                {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setModalSize(size)}
                                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${modalSize === size
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                                            }`}
                                    >
                                        {size.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-3 bg-linear-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold"
                            >
                                Open Modal ({modalSize})
                            </motion.button>
                        </div>
                    </section>

                    {/* Code Examples */}
                    <section className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">Toast Usage:</h3>
                                <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                                    <code className="text-sm text-green-300">
                                        {`import toast from 'react-hot-toast'

// Success
toast.success('Success message')

// Error
toast.error('Error message')

// Info
toast('Info message')

// Loading
const toastId = toast.loading('Loading...')
toast.success('Done!', { id: toastId })`}
                                    </code>
                                </pre>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-3">Modal Usage:</h3>
                                <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                                    <code className="text-sm text-blue-300">
                                        {`import Modal from '@/components/Modal'

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Your content here</p>
</Modal>`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Example Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`Example ${modalSize.toUpperCase()} Modal`}
                    size={modalSize}
                >
                    <div className="space-y-4">
                        <p className="text-white/80">
                            This is a {modalSize} sized modal. You can put any content here!
                        </p>
                        <div className="bg-white/5 p-4 rounded-lg">
                            <h4 className="text-white font-semibold mb-2">Modal Features:</h4>
                            <ul className="text-white/70 space-y-1 list-disc list-inside">
                                <li>Smooth animations with Framer Motion</li>
                                <li>Keyboard support (ESC to close)</li>
                                <li>Click outside to close</li>
                                <li>Four sizes: sm, md, lg, xl</li>
                                <li>Customizable content</li>
                            </ul>
                        </div>
                        <div className="flex gap-3 justify-end pt-4">
                            <button
                                onClick={() => {
                                    toast.success('Modal action confirmed!')
                                    setIsModalOpen(false)
                                }}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-6 py-2 bg-white/10 text-white rounded-lg font-semibold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
        </div>
    )
}
