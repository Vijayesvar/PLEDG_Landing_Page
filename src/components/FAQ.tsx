import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { EditorialCard } from './EditorialCard'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faqs?: FAQItem[] // Make optional as we might use internal data
}

export function FAQ({ faqs: propFaqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Indian-centric FAQs
  const defaultFaqs: FAQItem[] = [

    {
      question: 'How does this help me save on the 30% Bitcoin tax?',
      answer: 'In India, a flat 30% tax + 4% cess is applicable on the "transfer" (sale) of virtual digital assets. When you take a loan, you are NOT selling your Bitcoin; you are merely pledging it. Since no sale occurs, no capital gains tax event is triggered, allowing you to access liquidity without the heavy tax burden.',
    },
    {
      question: 'What happens if Bitcoin price drops? (Margin Call / Liquidation Policy)',
      answer: 'We have a transparent liquidation waterfall. 1. LTV > 70% (Warning): You receive an alert to top-up collateral. 2. LTV > 80% (Margin Call): You must add collateral or repay part of the loan. 3. LTV > 90% (Liquidation): Only enough Bitcoin is sold to bring LTV back to healthy levels. We do NOT liquidate your entire position instantly.',
    },
    {
      question: 'How is my Bitcoin stored? Who holds the keys?',
      answer: 'Your Bitcoin is secured by BitGo, a qualified institutional custodian. Pledg does NOT hold your private keys. Your assets are held in a segregated wallet (never commingled) and protected by Multi-Party Computation (MPC) technology. You are not trusting us; you are trusting the industry standard.',
    },
    {
      question: 'Can I top-up or add more collateral?',
      answer: 'Absolutely. You can add more Bitcoin collateral at any time to lower your LTV and avoid liquidation risks. This gives you full control over your loan health.',
    },
    {
      question: 'What happens if I miss an EMI or repayment date?',
      answer: 'We offer a grace period of 3 days. After that, a late fee is applied. If the loan remains unpaid for 30 days beyond the due date, we may initiate partial liquidation to recover the principal. We prioritize communication before taking any action.',
    },
    {
      question: 'Can I get my Bitcoin back instantly after repayment?',
      answer: 'Yes. Once your loan repayment is confirmed, your Bitcoin is instantly released from the smart contract/custody wallet back to your designated address. Our SLA guarantees release within 30 minutes of payment confirmation.',
    },
    {
      question: 'Do I receive funds in INR or USDT?',
      answer: 'We disburse funds directly in Indian Rupees (INR) to your bank account via NEFT/RTGS/IMPS. This ensures you can use the liquidity immediately for your real-world needs without worrying about exchange rates or P2P risks.',
    },
    {
      question: 'What documents are required for KYC?',
      answer: 'To comply with Indian regulations, we require standard KYC documents: your PAN Card and Aadhaar Card (or Passport/Voter ID). The process is fully digital and takes less than 5 minutes.',
    },
    {
      question: 'What is the interest rate and tenure?',
      answer: 'Our interest rates start at 14.5% APR. You can choose a flexible tenure ranging from 1 to 12 months. There are no prepayment penalties, so you can close the loan early whenever you wish.',
    },
  ]

  const displayFaqs = propFaqs || defaultFaqs

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="container-mobile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-6">
            <span className="text-gold-gradient">Common Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-sans">
            Clarity for the Indian Bitcoin investor.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EditorialCard className="p-0 overflow-hidden group hover:border-gold-muted/40 transition-colors duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className={`text-lg md:text-xl font-sans font-medium pr-8 transition-colors duration-300 ${openIndex === index ? 'text-gold-muted' : 'text-white group-hover:text-gold-muted/80'}`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'border-gold-muted bg-gold-muted/10 text-gold-muted' : 'border-white/10 text-gray-500 group-hover:border-gold-muted/30'}`}>
                    {openIndex === index ? (
                      <Minus size={16} />
                    ) : (
                      <Plus size={16} />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-400 leading-relaxed font-sans border-t border-white/5 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </EditorialCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 font-sans">
            Still have questions?{' '}
            <a
              href="mailto:support@pledg.in"
              className="text-gold-muted hover:text-white transition-colors border-b border-gold-muted/30 hover:border-white pb-0.5"
            >
              Contact our support team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
