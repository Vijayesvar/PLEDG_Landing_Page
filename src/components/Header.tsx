import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PledgLogo } from './PledgLogo'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Benefits', href: '/benefits' },
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Security', href: '/#security' },
    { name: 'FAQ', href: '/#faq' },
  ]

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.substring(1)
    }
    return location.pathname === href
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      // Handle hash navigation
      const elementId = href.substring(2) // Remove '/#'
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // For regular links, React Router will handle navigation
  }

  const isBenefitsPage = location.pathname === '/benefits'

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/95">
      <div className="container-custom py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <PledgLogo className="h-8 w-8" />
            <span className="text-xl font-bold">Pledg</span>
          </Link>

          {/* Desktop Navigation - Hidden on Benefits page */}
          {!isBenefitsPage && (
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
                  className={`hover:text-primary-400 transition-colors ${
                    isActive(item.href) ? 'text-primary-400 font-medium' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            {!isBenefitsPage && (
              <Link
                to="/#waitlist"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation('/#waitlist')
                }}
                className="btn-primary hidden md:inline-flex"
              >
                Join Waitlist
              </Link>
            )}
            
            {/* Mobile menu button - Hidden on Benefits page */}
            {!isBenefitsPage && (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Hidden on Benefits page */}
        {!isBenefitsPage && (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 border-t border-gray-700 pt-4"
              >
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={(e) => {
                        setIsMenuOpen(false)
                        if (item.href.startsWith('/#')) {
                          e.preventDefault()
                          handleNavigation(item.href)
                        }
                      }}
                      className={`hover:text-primary-400 transition-colors ${
                        isActive(item.href) ? 'text-primary-400 font-medium' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/#waitlist"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMenuOpen(false)
                      handleNavigation('/#waitlist')
                    }}
                    className="btn-primary mt-4"
                  >
                    Join Waitlist
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </header>
  )
}
