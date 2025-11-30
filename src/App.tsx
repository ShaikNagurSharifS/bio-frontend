import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import './styles/index.css'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Toast from './components/Toast'

export default function App() {
  return (
    <div className="App bg-linear-to-b from-[#0b0520] to-[#0b0b1a] text-white">
      <Toast />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
