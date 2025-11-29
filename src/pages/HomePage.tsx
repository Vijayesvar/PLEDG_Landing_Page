import { motion } from 'framer-motion'
import { ArrowRight, Shield, CheckCircle, Percent, Banknote, Lock, Info, Target, Building2 } from 'lucide-react'
import { HowItWorks } from '@/components/HowItWorks'

import { WaitlistForm } from '@/components/WaitlistForm'
import { FAQ } from '@/components/FAQ'
import { PremiumButton } from '@/components/PremiumButton'
import { EditorialCard } from '@/components/EditorialCard'
import { LoanCalculator } from '@/components/LoanCalculator'

import { TheMath } from '@/components/TheMath'

import { GoldSandBackground } from '@/components/GoldSandBackground'
import heroMockup from '../assets/hero-mockup.png'

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

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GoldSandBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/50 to-obsidian pointer-events-none" />
        </div>

        <div className="container-mobile relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-gold-bright animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-gold-bright">Coming Soon to India</span>
              </div>

              <h1 className="text-4xl md:text-7xl lg:text-8xl font-sans font-bold leading-tight md:leading-[0.9] tracking-tight mb-8">
                <span className="text-white block mb-2 md:mb-0">Keep Your Bitcoin.</span>
                <span className="text-gold-muted block italic mb-2 md:mb-0">Spend the Cash.</span>
                <span className="text-white block">Zero Tax Event.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed font-sans">
                The smartest way for Indian investors to access liquidity. Pledg your Bitcoin for instant cash without selling or triggering a 30% tax event.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <PremiumButton
                  size="xl"
                  onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group"
                >
                  <span>Calculate Savings</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </PremiumButton>

                <PremiumButton
                  variant="outline"
                  size="xl"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  How it Works
                </PremiumButton>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-0">
              {/* 3D Mockup Container */}
              <div className="relative z-10 w-full max-w-md mx-auto lg:max-w-full">
                <div className="absolute inset-0 bg-gold-muted/20 blur-[100px] rounded-full" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <img
                    src={heroMockup}
                    alt="Pledg App Interface"
                    className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
                  />

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-8 -right-8 glass-panel p-4 rounded-2xl border border-white/20 hidden md:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="text-green-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Loan Status</p>
                        <p className="text-white font-bold">Approved</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-8 -left-8 glass-panel p-4 rounded-2xl border border-white/20 hidden md:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold-muted/20 flex items-center justify-center">
                        <Banknote className="text-gold-muted" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Disbursed</p>
                        <p className="text-white font-bold">₹ 5,00,000</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Secured By Section */}
      <section className="py-10 border-y border-white/5 bg-white/2 backdrop-blur-sm">
        <div className="container-mobile">
          <p className="text-center text-xs text-gray-500 uppercase tracking-[0.2em] mb-8">
            Secured by Institutional Custody
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white tracking-tight">BitGo</span>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-white" />
              <span className="text-xl font-bold text-white tracking-tight">Regulated NBFC</span>
            </div>

          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <LoanCalculator />

      {/* The Math / Dilemma Section */}
      <TheMath />

      {/* Features Section */}
      <section id="features" className="py-24 bg-surface relative overflow-hidden">
        <div className="container-mobile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-sans font-bold mb-6">
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
      <HowItWorks />

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
