import { motion } from 'framer-motion'
import { ArrowRight, Shield, CheckCircle, Percent, Banknote, Lock, Zap, RefreshCw, Headphones, AlertCircle } from 'lucide-react'

import { WaitlistForm } from '@/components/WaitlistForm'
import { FAQ } from '@/components/FAQ'
import { NeopopButton } from '@/components/NeopopButton'
import { NeopopCard } from '@/components/NeopopCard'
import { BitcoinPrice } from '@/components/BitcoinPrice'
import { ScrollReveal } from '@/components/ScrollReveal'
import { AnimatedBackground } from '@/components/AnimatedBackground'

export function Home() {
  const features = [
    {
      icon: Percent,
      title: '50% LTV Ratio',
      description: 'Optimize your loan-to-value ratio at 50%, balancing liquidity needs with risk management.',
    },
    {
      icon: Banknote,
      title: 'INR Disbursement',
      description: 'Receive funds directly to your INR bank account via secure bank transfer.',
    },
    {
      icon: Lock,
      title: 'Enterprise-Grade Security',
      description: 'Advanced security measures ensure your assets are protected with institutional-level security.',
    },
    {
      icon: Zap,
      title: 'Fast Approval Process',
      description: 'Quick application review and approval process gets you access to funds when you need them.',
    },
    {
      icon: RefreshCw,
      title: 'Flexible Repayment',
      description: 'Multiple repayment options designed to fit your financial timeline and preferences.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer support team available around the clock to assist with any questions.',
    },
  ]

  const steps = [
    {
      number: '1',
      title: 'Apply',
      description: 'Complete our simple application process, indicating your desired loan amount.',
      features: ['Quick online application', 'No credit check required', 'Choose loan currency'],
    },
    {
      number: '2',
      title: 'Secure',
      description: 'Deposit your Bitcoin collateral into our secure, enterprise-grade wallet system.',
      features: ['Institutional-grade security', 'Multi-party computation', 'Insurance-backed protection'],
    },
    {
      number: '3',
      title: 'Receive Funds',
      description: 'Get your loan funds quickly disbursed to your preferred destination.',
      features: ['Fast transfer to INR bank account', 'Secure bank transfer process', 'Transparent fee structure'],
    },
  ]

  const faqs = [
    {
      question: 'What is the LTV ratio and why is 50% beneficial?',
      answer: 'LTV (Loan-to-Value) ratio is the proportion of the loan amount to the value of your collateral. Our 50% LTV means you can borrow up to 50% of your Bitcoin\'s value. This balanced ratio offers protection against market volatility while still providing substantial liquidity for your needs.',
    },
    {
      question: 'How does our secure wallet system work?',
      answer: 'Our secure wallet system uses MPC (Multi-Party Computation) technology, which means your private keys are never stored in a single location. Combined with segregated cold storage, advanced encryption, and comprehensive risk management protocols, your Bitcoin collateral is protected by institutional-grade security that eliminates single points of failure.',
    },
    {
      question: 'What happens if the value of Bitcoin drops?',
      answer: 'If Bitcoin\'s value decreases, your LTV ratio increases. At certain thresholds, you may receive margin calls to either add more collateral or partially repay your loan to maintain a healthy LTV. Our 50% initial LTV provides a substantial buffer against market volatility.',
    },
    {
      question: 'What disbursement methods do you support?',
      answer: 'We currently disburse loans in INR via secure bank transfer directly to your Indian bank account. This ensures fast, reliable, and compliant fund transfers.',
    },
    {
      question: 'What are the loan terms and interest rates?',
      answer: 'Loan terms range from 3 to 12 months. Interest rates start from 12% APR and vary by term, loan amount, and market conditions. You will see your final rate before accepting.',
    },
    {
      question: 'What are the loan amount limits?',
      answer: 'We offer loans ranging from ₹10,000 to ₹1,00,00,000. The exact amount you can borrow depends on the value of your Bitcoin collateral and our 50% LTV ratio.',
    },
    {
      question: 'Do you rehypothecate collateral?',
      answer: 'No. Pledg does not rehypothecate collateral. Your BTC is segregated and never lent or pledged elsewhere.',
    },
    {
      question: 'Can I monitor my collateral on-chain?',
      answer: 'Yes. We provide an on-chain address so you can monitor your collateral at all times for transparency.',
    },
    {
      question: 'How fast can I get funded?',
      answer: 'Once collateral is received and verification is complete, disbursement typically occurs within 24 hours directly to your INR bank account.',
    },
    {
      question: 'Are there prepayment penalties?',
      answer: 'No. You can repay early at any time. Interest accrues only for days outstanding.',
    },
    {
      question: 'What are the eligibility and KYC requirements?',
      answer: 'Standard KYC and AML checks are required before disbursement. Availability may vary by jurisdiction.',
    },
    {
      question: 'How is my BTC stored?',
      answer: 'Collateral is held using secure, encrypted wallets with multiple layers of protection and approval controls. Your assets are never at risk from single points of failure.',
    },
  ]

  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="container-custom py-16 md:py-28 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h1
              className="font-bold leading-tight text-4xl md:text-6xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="gradient-text-animated text-glow">Bitcoin-Backed</span>
              <br />
              <span className="text-white">Loans for</span>
              <br />
              <span className="text-white">Your Financial Freedom</span>
            </motion.h1>
            <p className="text-lg text-gray-300 md:pr-12">
              Access immediate liquidity with your BTC assets. Disbursements available in INR via secure bank transfer at 50% LTV with industry-leading security.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <NeopopButton
                variant="neopop"
                size="lg"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2"
              >
                <span>Join Waitlist</span>
                <ArrowRight size={20} />
              </NeopopButton>
              <NeopopButton
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = '/benefits'}
                className="flex items-center justify-center gap-2"
              >
                <span>Why Bitcoin Loans Matter in India</span>
                <ArrowRight size={20} />
              </NeopopButton>
            </div>
            <div
              className="flex items-center gap-2 text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm w-fit"
            >
              <Shield className="text-green-400" size={18} />
              <span className="text-sm font-medium">Enterprise-grade security</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-20 -right-20 h-64 w-64 bg-primary-500/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
            <motion.div
              className="relative glass-card p-6 transform hover:scale-105 transition-transform duration-500 shadow-neopop-lg"
              whileHover={{ rotateY: 5, rotateX: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-glow-sm">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="font-bold">Pledg</span>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium animate-pulse">Secure</span>
              </div>
              <div className="space-y-4">
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary-400" size={16} />
                    <span>50% LTV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary-400" size={16} />
                    <span>Rates start from 12% APR</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary-400" size={16} />
                    <span>No rehypothecation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary-400" size={16} />
                    <span>On-chain address provided to monitor collateral</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg font-medium hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105">
                  Apply Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bitcoin Price Section */}
      <ScrollReveal>
        <section className="container-custom py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-neopop-gradient">Live Bitcoin Price</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Track current Bitcoin value to make informed decisions about your collateral</p>
          </motion.div>

          <div className="flex justify-center">
            <BitcoinPrice />
          </div>
        </section>
      </ScrollReveal>

      {/* Benefits CTA Section */}
      <section className="bg-gradient-to-r from-primary-900/30 to-gray-900/50 py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">Why Bitcoin-Backed Loans</span>
              <br />
              <span className="text-neopop-gradient">Matter in India</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover how Bitcoin-backed loans can save you lakhs in taxes, preserve your crypto holdings,
              and provide instant liquidity in INR without selling your Bitcoin.
            </p>
            <div className="flex justify-center">
              <NeopopButton
                variant="neopop"
                size="lg"
                onClick={() => window.location.href = '/benefits'}
                className="flex items-center justify-center gap-2"
              >
                <span>Explore Benefits for Indian Crypto Holders</span>
                <ArrowRight size={20} />
              </NeopopButton>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-blue-400 mb-2">24hrs</div>
                <div className="text-gray-300">Disbursement Time</div>
                <div className="text-sm text-gray-400">Direct to Indian bank accounts</div>
              </div>
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <div className="text-3xl font-bold text-purple-400 mb-2">0%</div>
                <div className="text-gray-300">Capital Gains Tax</div>
                <div className="text-sm text-gray-400">When using Bitcoin as collateral</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <ScrollReveal delay={100}>
        <section id="features" className="container-custom section-padding relative">
          <div className="absolute top-0 right-0 h-96 w-96 bg-primary-500/10 rounded-full blur-3xl -z-10 animate-float-delayed"></div>
          <div className="absolute bottom-0 left-0 h-64 w-64 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-float"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Pledg</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Access the financial flexibility you need without selling your Bitcoin assets</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 100}>
                <NeopopCard
                  variant="default"
                  className="p-6 hover-lift"
                >
                  <div className="icon-neopop mb-4">
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-neopop-gradient">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </NeopopCard>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* How It Works Section */}
      <section id="how-it-works" className="container-custom section-padding relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Pledg Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Simple process to get the funds you need while keeping your BTC assets</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700 relative hover:shadow-lg hover:shadow-primary-500/10 transition-all"
            >
              <div className="absolute -top-5 -left-5 h-12 w-12 bg-primary-500 rounded-full flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-2">{step.title}</h3>
              <p className="text-gray-400 mb-4">{step.description}</p>
              <ul className="space-y-2 text-gray-400">
                {step.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle className="text-green-400" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>


      </section>

      {/* Security Section */}
      <section id="security" className="container-custom section-padding relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-gradient-to-r from-primary-900/20 to-purple-900/20 rounded-full blur-3xl -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise-Grade Security</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Your assets are protected with the highest standards of security and transparency.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NeopopCard variant="glow" className="p-8 flex flex-col justify-center items-center text-center">
            <Shield className="h-16 w-16 text-primary-400 mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-neopop-gradient">Pledg Security</h3>
            <p className="text-gray-300 mb-6">
              We prioritize the safety of your assets. Our platform employs a multi-layered security architecture,
              including Multi-Party Computation (MPC) technology, segregated cold storage wallets, and robust risk management protocols.
              Your Bitcoin collateral is held in segregated wallets and never rehypothecated, ensuring maximum protection and transparency.
            </p>
          </NeopopCard>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                title: 'Multi-Party Computation (MPC)',
                description: 'Advanced MPC technology ensures your private keys are never stored in a single location, eliminating single points of failure.',
                icon: Lock,
              },
              {
                title: 'Segregated Wallets',
                description: 'Your Bitcoin collateral is held in completely segregated wallets, never mixed with other assets or rehypothecated.',
                icon: Shield,
              },
              {
                title: 'Cold Storage Security',
                description: 'Assets are stored in offline cold storage with MPC (Multi-Party Computation) technology and institutional-grade security protocols.',
                icon: AlertCircle,
              },
              {
                title: 'Regular Security Audits',
                description: 'Our systems undergo regular security audits by independent third parties to ensure the highest security standards.',
                icon: CheckCircle,
              },
            ].map((feature) => (
              <NeopopCard
                key={feature.title}
                variant="glass"
                className="p-6 flex items-start gap-4"
              >
                <div className="icon-neopop flex-shrink-0">
                  <feature.icon className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-neopop-gradient">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </NeopopCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={faqs} />

      {/* Waitlist Form */}
      <WaitlistForm />
    </>
  )
}
