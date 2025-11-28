import { motion } from 'framer-motion'
import { ArrowRight, Shield, CheckCircle, Percent, Banknote, Lock, Zap, Info, Target, ChevronDown } from 'lucide-react'

import { WaitlistForm } from '@/components/WaitlistForm'
import { FAQ } from '@/components/FAQ'
import { PremiumButton } from '@/components/PremiumButton'
import { EditorialCard } from '@/components/EditorialCard'
import { BitcoinPrice } from '@/components/BitcoinPrice'
import { LoanCalculator } from '@/components/LoanCalculator'
import { BitcoinComparison } from '@/components/BitcoinComparison'

export function Home() {
  const pledgStandardFeatures = [
    {
      icon: Shield,
      title: 'Tax Efficiency',
      description: 'Skip the 30% + 4% cess tax on Bitcoin gains by using Bitcoin as collateral instead of selling.',
    },
    {
      icon: Banknote,
      title: 'Instant Liquidity',
      description: 'Receive funds directly to your INR bank account via secure bank transfer within 24 hours.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Assets secured by BitGo\'s institutional-grade custody with Multi-Party Computation (MPC).',
    },
    {
      icon: Percent,
      title: 'Smart LTV',
      description: 'Optimize your loan-to-value ratio at 50%, balancing liquidity needs with risk management.',
    },
    {
      icon: Target,
      title: 'Flexible Terms',
      description: 'Choose loan terms from 1 to 12 months with no credit checks required.',
    },
    {
      icon: Info,
      title: 'Full Compliance',
      description: 'Fully compliant with Indian financial regulations for secure and transparent operations.',
    },
  ]

  const steps = [
    {
      number: '01',
      title: 'Apply',
      description: 'Complete our simple application process, indicating your desired loan amount.',
      features: ['Quick online application', 'No credit check required', 'Flexible tenure options'],
    },
    {
      number: '02',
      title: 'Secure',
      description: 'Deposit your Bitcoin collateral into our secure, enterprise-grade wallet system.',
      features: ['Institutional-grade security', 'Multi-party computation', 'Insurance-backed protection'],
    },
    {
      number: '03',
      title: 'Receive Funds',
      description: 'Get your loan funds quickly disbursed to your preferred destination.',
      features: ['Fast transfer to INR bank account', 'Secure bank transfer process', 'Transparent fee structure'],
    },
  ]



  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gold-muted/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-obsidian/50 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container-mobile relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gold-muted animate-pulse" />
                <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Coming Soon to India</span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight md:leading-[0.9] tracking-tight">
                <span className="text-white block mb-2 md:mb-0">Liquidity</span>
                <span className="text-gold-muted block italic mb-2 md:mb-0">Without Selling</span>
                <span className="text-white block">Bitcoin.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
                Unlock the value of your Bitcoin with instant INR loans.
                Keep your assets, optimize your taxes, and maintain your long-term position.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <PremiumButton
                  size="lg"
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group"
                >
                  <span>Calculate Savings</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </PremiumButton>
                <PremiumButton
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  How it Works
                </PremiumButton>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-gold-muted" />
                  <span>Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-gold-muted" />
                  <span>24h Disbursement</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <BitcoinPrice />

              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Calculator Section */}
      <LoanCalculator />

      {/* The Indian Bitcoin Dilemma */}
      <section className="container-mobile py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-white">The Indian Bitcoin Dilemma</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">Why traditional financial solutions don't work for Bitcoin holders in India</p>
        </motion.div>

        <BitcoinComparison />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface relative overflow-hidden">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              The <span className="text-gold-muted italic">Pledg</span> Standard
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built for the sophisticated investor who demands security, speed, and transparency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pledgStandardFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EditorialCard className="h-full hover:bg-white/5 transition-colors duration-500">
                  <div className="w-12 h-12 rounded-full bg-gold-muted/10 flex items-center justify-center mb-6 text-gold-muted">
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </EditorialCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative">
        <div className="container-mobile">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  Seamless Access to <br />
                  <span className="text-gold-gradient">Global Liquidity</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Three simple steps to unlock the value of your digital assets without tax events.
                </p>
              </motion.div>

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative pl-12 border-l border-white/10"
                  >
                    <span className="absolute -left-[19px] top-0 w-10 h-10 rounded-full bg-obsidian border border-gold-muted text-gold-muted flex items-center justify-center font-serif font-bold text-sm">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle size={14} className="text-gold-muted" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gold-muted/5 rounded-full blur-[100px]" />
              <EditorialCard className="relative z-10 p-8 border-gold-muted/20">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-muted/10 flex items-center justify-center shrink-0">
                      <Shield className="text-gold-muted" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white mb-1">Join the Waitlist</h3>
                      <p className="text-sm text-gray-400">Be the first to access India's premium Bitcoin lending platform.</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-muted/10 flex items-center justify-center">
                        <CheckCircle size={16} className="text-gold-muted" />
                      </div>
                      <p className="text-sm text-gray-300">Priority Access to Beta</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-muted/10 flex items-center justify-center">
                        <CheckCircle size={16} className="text-gold-muted" />
                      </div>
                      <p className="text-sm text-gray-300">Zero Tax Events</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold-muted/10 flex items-center justify-center">
                        <CheckCircle size={16} className="text-gold-muted" />
                      </div>
                      <p className="text-sm text-gray-300">Enterprise-Grade Security</p>
                    </div>
                  </div>

                  <PremiumButton className="w-full mt-4" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
                    Join the Waitlist
                  </PremiumButton>
                </div>
              </EditorialCard>
            </div>
          </div>
        </div>
      </section>



      {/* Security Section */}
      <section id="security" className="py-24 bg-surface relative overflow-hidden">
        <div className="container-mobile">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Uncompromising Security</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Your assets are protected by institutional-grade infrastructure and multi-layered protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EditorialCard className="text-center p-8 hover:border-gold-muted/30 transition-colors">
              <Shield className="w-12 h-12 text-gold-muted mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-3">MPC Technology</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Multi-Party Computation ensures no single point of failure. Private keys are split and never reconstructed.
              </p>
            </EditorialCard>
            <EditorialCard className="text-center p-8 hover:border-gold-muted/30 transition-colors">
              <Lock className="w-12 h-12 text-gold-muted mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-3">BitGo Custody</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We partner with BitGo for institutional-grade qualified custody, ensuring your assets are protected by the industry leader.
              </p>
            </EditorialCard>
            <EditorialCard className="text-center p-8 hover:border-gold-muted/30 transition-colors">
              <CheckCircle className="w-12 h-12 text-gold-muted mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold text-white mb-3">Regular Audits</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Continuous security assessments and real-time monitoring by industry-leading security firms.
              </p>
            </EditorialCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Waitlist Form */}
      <WaitlistForm />
    </>
  )
}
