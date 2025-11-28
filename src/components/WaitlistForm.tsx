import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, Phone, DollarSign, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { PremiumButton } from './PremiumButton'
import { EditorialInput } from './EditorialInput'
import { EditorialCard } from './EditorialCard'

interface WaitlistData {
  name: string
  email: string
  phone: string
  amount: string
  term: string
  notes: string
}

export function WaitlistForm() {
  const [formData, setFormData] = useState<WaitlistData>({
    name: '',
    email: '',
    phone: '',
    amount: '',
    term: '',
    notes: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || 'Server error occurred');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join waitlist')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        amount: '',
        term: '',
        notes: '',
      })
    } catch (error: any) {
      console.error('Error submitting waitlist:', error)
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to join waitlist')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="waitlist" className="py-24 relative">
      <div className="container-mobile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            <span className="text-white">Join the</span>{' '}
            <span className="text-gold-gradient">Exclusive Waitlist</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            Secure your spot for early access. Limited availability for the initial launch cohort.
          </p>
        </motion.div>

        <EditorialCard className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EditorialInput
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                label="Full Name"
                placeholder="Satoshi Nakamoto"
                required
                icon={<User size={18} />}
              />
              <EditorialInput
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                label="Email Address (Optional)"
                placeholder="satoshi@bitcoin.org"
                icon={<Mail size={18} />}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EditorialInput
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                label="Phone Number"
                placeholder="+91 98765 43210"
                required
                icon={<Phone size={18} />}
              />
              <EditorialInput
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                label="Desired Loan Amount"
                placeholder="₹1,00,000"
                required
                icon={<DollarSign size={18} />}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 font-medium mb-2 ml-1">
                Loan Term Preference
              </label>
              <select
                name="term"
                value={formData.term}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-gold-muted transition-colors text-white"
              >
                <option value="" disabled className="bg-obsidian text-gray-500">Select a term</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                  <option key={m} value={m} className="bg-obsidian">{m} Months</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 font-medium mb-2 ml-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any specific requirements?"
                rows={3}
                className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-gold-muted transition-colors placeholder-white/20 resize-none"
              />
            </div>

            <div className="pt-4">
              <PremiumButton
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting}
                className="w-full group"
              >
                <span>Submit Application</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </PremiumButton>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 text-green-400 bg-green-900/10 p-4 rounded-lg border border-green-500/20"
                >
                  <CheckCircle size={20} />
                  <span>Successfully joined the waitlist! We'll contact you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 text-red-400 bg-red-900/10 p-4 rounded-lg border border-red-500/20"
                >
                  <AlertCircle size={20} />
                  <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </EditorialCard>
      </div>
    </section>
  )
}
