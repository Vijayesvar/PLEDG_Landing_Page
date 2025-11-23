import { motion } from 'framer-motion'
import { TrendingUp, Shield, AlertCircle, Building, Target, Info } from 'lucide-react'
import { LoanCalculator } from '@/components/LoanCalculator'
import { NeopopCard } from '@/components/NeopopCard'
import { BitcoinPrice } from '@/components/BitcoinPrice'
import { BitcoinComparison } from '@/components/BitcoinComparison'
import { BitcoinStats } from '@/components/BitcoinStats'

export function Benefits() {
  const trustIndicators = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level protection for your assets',
    },
    {
      icon: Shield,
      title: 'Regulatory Compliant',
      description: 'Fully compliant with Indian regulations',
    },
    {
      icon: Shield,
      title: '24/7 Support',
      description: 'Dedicated customer support in Hindi & English',
    },
    {
      icon: TrendingUp,
      title: 'No Capital Gains',
      description: 'Avoid tax implications of selling Bitcoin',
    },
  ]

  const benefitsForIndians = [
    {
      icon: Shield,
      title: 'Avoid High Tax Burden',
      description: 'Skip the 30% + 4% cess tax on crypto gains by using Bitcoin as collateral instead of selling.',
      highlight: 'Save lakhs in taxes',
    },
    {
      icon: TrendingUp,
      title: 'Preserve Bitcoin Holdings',
      description: 'Keep your Bitcoin for potential future growth while accessing immediate liquidity in INR.',
      highlight: 'Don\'t miss Bitcoin\'s upside',
    },
    {
      icon: Building,
      title: 'No Credit Checks Required',
      description: 'Get loans based on your Bitcoin collateral without traditional banking documentation.',
      highlight: 'Collateral-based lending',
    },
    {
      icon: AlertCircle,
      title: 'Quick INR Disbursement',
      description: 'Receive funds directly in your Indian bank account within 24 hours.',
      highlight: 'Fast access to liquidity',
    },
    {
      icon: Target,
      title: 'Flexible Loan Terms',
      description: 'Choose loan terms from 3 to 12 months that suit your financial needs.',
      highlight: 'Customizable repayment',
    },
    {
      icon: Info,
      title: 'Regulatory Compliance',
      description: 'Fully compliant with Indian financial regulations for secure and transparent operations.',
      highlight: 'Legal and transparent',
    },
  ]


  return (
    <>
      {/* Hero Section */}
      <section className="container-custom py-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="font-bold leading-tight mb-6 text-4xl md:text-6xl">
            <span className="gradient-text">Why Bitcoin-Backed Loans</span>
            <br />
            <span className="text-white">Matter in India</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Unlock the true potential of your Bitcoin holdings without selling. Access liquidity in INR while maintaining your crypto portfolio's growth potential.
          </p>
        </motion.div>
      </section>

      {/* Bitcoin Price Section */}
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

      {/* Trust Indicators */}
      <section className="container-custom py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <indicator.icon className="text-white" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{indicator.title}</h3>
              <p className="text-gray-400 text-sm">{indicator.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Indian Crypto Dilemma */}
      <section className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Indian Crypto Dilemma</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">Why traditional financial solutions don't work for crypto holders in India</p>
        </motion.div>

        <BitcoinComparison />
      </section>

      {/* Use Cases */}
      <section className="bg-gray-900/50 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Bitcoin-Backed Loans Help Indians</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Key benefits that make Bitcoin-backed loans essential for Indian crypto holders</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {benefitsForIndians.map((benefit) => (
              <NeopopCard
                key={benefit.title}
                variant="default"
                className="p-6"
              >
                <div className="icon-neopop mb-4">
                  <benefit.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neopop-gradient">{benefit.title}</h3>
                <p className="text-gray-400 mb-4">{benefit.description}</p>
                <div className="badge-neopop">
                  <p className="text-sm">
                    <strong>{benefit.highlight}</strong>
                  </p>
                </div>
              </NeopopCard>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <LoanCalculator />

      {/* Statistics */}
      <section className="bg-gray-900/50 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Bitcoin Market Data</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real-time Bitcoin statistics to help you make informed decisions</p>
          </motion.div>

          <BitcoinStats />
        </div>
      </section>

    </>
  )
}
