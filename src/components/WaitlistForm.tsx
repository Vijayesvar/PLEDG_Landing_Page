import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, Phone, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import { NeopopButton } from './NeopopButton'
import { NeopopInput } from './NeopopInput'
import { NeopopCard } from './NeopopCard'

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
      // Send data to Vercel backend API
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
        // If it's not JSON, it's likely a Vercel error page or plain text error
        throw new Error(text || 'Server error occurred');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join waitlist')
      }

      console.log('Waitlist submission successful:', data)
      setSubmitStatus('success')

      // Reset form
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
    <section id="waitlist" className="bg-gradient-to-r from-primary-900/50 to-gray-900 section-padding scroll-mt-32">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Unlock the Value of Your Bitcoin?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Join our waitlist today and be among the first to access our Bitcoin-backed loan services when we launch.
          </p>

          <NeopopCard variant="glow" className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start text-left">
              {/* Name */}
              <NeopopInput
                type="text"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder="Full name *"
                icon={<User size={20} />}
                label="Full Name *"
                required
              />

              {/* Email */}
              <NeopopInput
                type="email"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                placeholder="Email address *"
                icon={<Mail size={20} />}
                label="Email Address *"
                required
              />

              {/* Phone */}
              <NeopopInput
                type="tel"
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                placeholder="Phone number"
                icon={<Phone size={20} />}
                label="Phone Number (Optional)"
              />


              {/* Amount */}
              <NeopopInput
                type="text"
                value={formData.amount}
                onChange={(value) => setFormData(prev => ({ ...prev, amount: value }))}
                placeholder="₹10,000 - ₹1,00,00,000"
                icon={<DollarSign size={20} />}
                label="Desired Loan Amount"
                required
              />

              {/* Term */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Loan Term</label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  required
                  className="input-neopop"
                >
                  <option value="" disabled>Select loan term</option>
                  <option value="3">Term: 3 months</option>
                  <option value="6">Term: 6 months</option>
                  <option value="9">Term: 9 months</option>
                  <option value="12">Term: 12 months</option>
                </select>
              </div>

              {/* Notes */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes or requirements"
                  rows={3}
                  className="input-neopop resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-3">
                <NeopopButton
                  type="submit"
                  variant="neopop"
                  size="lg"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className="w-full"
                >
                  <Mail size={20} className="mr-2" />
                  Join Waitlist
                </NeopopButton>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-3 flex items-center gap-2 text-green-400 bg-green-900/20 p-3 rounded-lg border border-green-500/20"
                >
                  <CheckCircle size={20} />
                  <span>Successfully joined the waitlist! We'll contact you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-3 flex items-center gap-2 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/20"
                >
                  <AlertCircle size={20} />
                  <span>{errorMessage || 'Something went wrong. Please try again.'}</span>
                </motion.div>
              )}
            </form>

          </NeopopCard>
        </motion.div>
      </div>
    </section>
  )
}
