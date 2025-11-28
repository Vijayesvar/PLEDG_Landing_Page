import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, XCircle, HelpCircle } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { PremiumButton } from './PremiumButton'
import { EditorialCard } from './EditorialCard'
import { EditorialInput } from './EditorialInput'
import { CalculatorGuide } from './CalculatorGuide'

interface LoanCalculation {
  loanAmount: number
  collateralRequired: number
  totalInterest: number
  totalRepayment: number
  taxOnSale: number
  taxWithLoan: number
  taxSavings: number
  netBenefit: number
  warningCollateral: number
  liquidationCollateral: number
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(100000)
  const [capitalGains, setCapitalGains] = useState<number>(50000)
  const [loanTerm, setLoanTerm] = useState<number>(12)
  const [interestRate, setInterestRate] = useState<number>(13.5)
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null)

  const calculateLoan = useCallback(() => {
    // Calculate collateral required (200% of loan amount for 50% LTV)
    const collateralRequired = loanAmount * 2

    // Calculate monthly payment using EMI formula
    const monthlyRate = interestRate / 100 / 12
    let monthlyPayment: number
    let totalInterest: number

    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / loanTerm
      totalInterest = 0
    } else {
      const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)
      const denominator = Math.pow(1 + monthlyRate, loanTerm) - 1
      monthlyPayment = numerator / denominator
      totalInterest = (monthlyPayment * loanTerm) - loanAmount
    }

    const totalRepayment = loanAmount + totalInterest

    // Calculate tax savings (30% + 4% cess = 31.2%) on Capital Gains
    const taxRate = 0.312
    const taxOnSale = capitalGains * taxRate
    const taxWithLoan = 0
    const taxSavings = taxOnSale
    const netBenefit = taxSavings - totalInterest

    // Risk Thresholds
    const warningCollateral = loanAmount / 0.716
    const liquidationCollateral = loanAmount / 0.8333

    setCalculation({
      loanAmount,
      collateralRequired,
      totalInterest,
      totalRepayment,
      taxOnSale,
      taxWithLoan,
      taxSavings,
      netBenefit,
      warningCollateral,
      liquidationCollateral,
    })
  }, [loanAmount, capitalGains, loanTerm, interestRate])

  return (
    <section id="calculator" className="py-20 relative overflow-hidden">
      <div className="container-mobile">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4">
            <span className="text-gold-gradient">Smart Calculator</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            See how much you can save by borrowing against your Bitcoin instead of selling it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            <EditorialCard className="h-full">
              <div className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold-muted font-medium mb-4">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-muted"
                  />
                  <div className="mt-4">
                    <EditorialInput
                      type="text"
                      value={formatNumber(loanAmount)}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/,/g, ''))
                        if (!isNaN(val)) setLoanAmount(val)
                      }}
                      className="text-2xl font-serif font-bold text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gold-muted font-medium mb-4">
                    Estimated Capital Gains (₹)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="10000"
                    value={capitalGains}
                    onChange={(e) => setCapitalGains(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-muted"
                  />
                  <div className="mt-4">
                    <EditorialInput
                      type="text"
                      value={formatNumber(capitalGains)}
                      onChange={(e) => {
                        const val = Number(e.target.value.replace(/,/g, ''))
                        if (!isNaN(val)) setCapitalGains(val)
                      }}
                      className="text-2xl font-serif font-bold text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                      Term (Months)
                    </label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-serif focus:outline-none focus:border-gold-muted transition-colors"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                        <option key={m} value={m} className="bg-obsidian">{m} Months</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                      Interest (APR)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => {
                          const val = Number(e.target.value)
                          if (val >= 13.5) setInterestRate(val)
                        }}
                        onBlur={() => {
                          if (interestRate < 13.5) setInterestRate(13.5)
                        }}
                        min="13.5"
                        step="0.1"
                        className="w-full bg-transparent border-b border-white/20 py-2 text-xl font-serif focus:outline-none focus:border-gold-muted transition-colors pr-8"
                      />
                      <span className="absolute right-0 top-2 text-gray-500 pointer-events-none">%</span>
                    </div>
                  </div>
                </div>

                <PremiumButton
                  onClick={calculateLoan}
                  className="w-full"
                  size="lg"
                >
                  Calculate Savings
                </PremiumButton>
              </div>
            </EditorialCard>
          </div>

          {/* Results */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {calculation ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-end">
                    <button
                      onClick={() => setCalculation(null)}
                      className="text-xs uppercase tracking-widest text-gray-500 hover:text-white flex items-center gap-2 transition-colors"
                    >
                      <HelpCircle size={14} />
                      Show Guide
                    </button>
                  </div>

                  {/* Main Benefit Card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold-muted/20 to-transparent border border-gold-muted/30 p-8">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp size={100} />
                    </div>
                    <p className="text-gold-muted uppercase tracking-widest text-xs font-bold mb-2">Net Benefit</p>
                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
                      {formatCurrency(calculation.netBenefit)}
                    </h3>
                    <p className="text-gray-400 text-sm">Total savings compared to selling your Bitcoin</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <EditorialCard>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Collateral Required</p>
                      <p className="text-xl font-serif font-bold text-white">{formatCurrency(calculation.collateralRequired)}</p>
                    </EditorialCard>
                    <EditorialCard>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Interest</p>
                      <p className="text-xl font-serif font-bold text-red-400">{formatCurrency(calculation.totalInterest)}</p>
                    </EditorialCard>
                    <EditorialCard>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Tax Saved</p>
                      <p className="text-xl font-serif font-bold text-green-400">{formatCurrency(calculation.taxSavings)}</p>
                    </EditorialCard>
                  </div>

                  {/* Risk Analysis */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Risk Analysis</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-orange-900/10 border border-orange-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-orange-400">
                          <AlertTriangle size={16} />
                          <span className="text-xs font-bold uppercase">Margin Call</span>
                        </div>
                        <p className="text-sm text-gray-400">Bitcoin Price Drop</p>
                        <p className="text-lg font-serif font-bold text-white">{formatCurrency(calculation.warningCollateral)}</p>
                      </div>
                      <div className="bg-red-900/10 border border-red-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-red-400">
                          <XCircle size={16} />
                          <span className="text-xs font-bold uppercase">Liquidation</span>
                        </div>
                        <p className="text-sm text-gray-400">Bitcoin Price Drop</p>
                        <p className="text-lg font-serif font-bold text-white">{formatCurrency(calculation.liquidationCollateral)}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <CalculatorGuide />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section >
  )
}
