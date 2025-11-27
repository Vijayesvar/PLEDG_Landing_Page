import { PledgLogo } from './PledgLogo'
import { Twitter, MessageCircle, Users } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/5 py-12 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <div className="flex items-center gap-1.5 mb-6">
              <PledgLogo className="h-8 w-8" />
              <span className="text-2xl font-serif font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Pledg</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Unlock the value of your Bitcoin without selling. Secure, flexible loans backed by your Bitcoin assets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors p-2 hover:bg-white/5 rounded-full">
                <Twitter size={18} />
              </a>
              <a href="https://wa.me/919994619773" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors p-2 hover:bg-white/5 rounded-full">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors p-2 hover:bg-white/5 rounded-full">
                <Users size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-400 transition-colors">How It Works</a></li>

            </ul>
          </div>

          {/* Security */}
          <div>
            <h4 className="font-semibold text-white mb-6">Security</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#security" className="hover:text-primary-400 transition-colors">BitGo Custody</a></li>
              <li><a href="#security" className="hover:text-primary-400 transition-colors">MPC Technology</a></li>
              <li><a href="#security" className="hover:text-primary-400 transition-colors">100% Compliance</a></li>
              <li><a href="#security" className="hover:text-primary-400 transition-colors">Regular Audits</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <span className="block text-xs text-gray-500 mb-1">Email</span>
                <a href="mailto:contact@pledg.in" className="hover:text-primary-400 transition-colors">contact@pledg.in</a>
              </li>
              <li>
                <span className="block text-xs text-gray-500 mb-1">WhatsApp</span>
                <a href="https://wa.me/919994619773" className="hover:text-primary-400 transition-colors">+91 99946 19773</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Pledg. All rights reserved. | Made for Indian Bitcoin holders</p>
        </div>
      </div>
    </footer>
  )
}
