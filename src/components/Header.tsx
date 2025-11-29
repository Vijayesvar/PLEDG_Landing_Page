import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PledgLogo } from './PledgLogo'
import { PremiumButton } from './PremiumButton'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navigation = [

    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Security', href: '/#security' },
    { name: 'FAQ', href: '/#faq' },
  ]

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false)
    if (href.startsWith('/#')) {
      const elementId = href.substring(2)
      const element = document.getElementById(elementId)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    }
  }



  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-obsidian/90 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-muted/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <PledgLogo className="h-16 w-auto relative z-10" />
            </div>
            <span
              className="text-3xl font-sans font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] via-[#b38728] via-[#fbf5b7] to-[#aa771c] ml-2"
              style={{ backgroundImage: 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)' }}
            >
              Pledg
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('/#')) {
                    e.preventDefault()
                    handleNavigation(item.href)
                  }
                }}
                className="text-sm font-medium text-gray-400 hover:text-gold-muted transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
            <PremiumButton
              variant="primary"
              size="sm"
              onClick={() => handleNavigation('/#waitlist')}
            >
              Join Waitlist
            </PremiumButton>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-white hover:text-gold-muted transition-colors"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-obsidian flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-5 border-b border-white/5">
              <span className="text-xl font-serif font-bold text-white">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center p-8 space-y-6">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={(e) => {
                      if (item.href.startsWith('/#')) {
                        e.preventDefault()
                        handleNavigation(item.href)
                      } else {
                        setIsMenuOpen(false)
                      }
                    }}
                    className="text-3xl font-serif font-medium text-gray-300 hover:text-gold-muted transition-colors flex items-center gap-4 group"
                  >
                    <span className="w-0 group-hover:w-8 h-[1px] bg-gold-muted transition-all duration-300" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="p-8 border-t border-white/5">
              <PremiumButton
                variant="primary"
                className="w-full justify-between group"
                onClick={() => handleNavigation('/#waitlist')}
              >
                <span>Join Waitlist</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
