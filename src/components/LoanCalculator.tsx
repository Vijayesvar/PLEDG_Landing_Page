import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency, formatNumber } from '@/lib/utils'

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
  const [loanAmount, setLoanAmount] = useState<number>(500000)
  const [capitalGains, setCapitalGains] = useState<number>(200000)
  const [loanTerm, setLoanTerm] = useState<number>(12)
  const interestRate = 13.5
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
    // Assuming the loan amount is roughly equivalent to what they would have sold
    // So if they take a loan of 5L, they avoid selling 5L worth of BTC.
    // The capital gains portion of that 5L depends on their buy price, but here we use the user input 'Estimated Capital Gains'
    // as the gains they would have realized if they sold enough BTC to get 'Loan Amount'.
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

  // Auto-calculate on change
  useEffect(() => {
    calculateLoan()
  }, [calculateLoan])

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="container-mobile relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4">
            <span className="text-white">Calculate Your </span>
            <span className="text-gold-bright">Advantage</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
            Visualize the immediate value of pledging versus selling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-8 space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs uppercase tracking-widest text-gold-muted font-bold">
                    Loan Amount (₹)
                  </label>
                  <span className="text-white font-serif font-bold text-xl">{formatNumber(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-muted hover:accent-gold-muted/80 transition-all"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹50k</span>
                  <span>₹50L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xs uppercase tracking-widest text-emerald-green font-bold">
                    Potential Capital Gains (₹)
                  </label>
                  <span className="text-white font-serif font-bold text-xl">{formatNumber(capitalGains)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  The profit you would realize if you sold Bitcoin equivalent to the loan amount.
                </p>
                <input
                  type="range"
                  min="0"
                  max={loanAmount} // Gains can't exceed the amount sold (roughly)
                  step="5000"
                  value={capitalGains}
                  onChange={(e) => setCapitalGains(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-green hover:accent-emerald-green/80 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">
                    Term
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-gold-muted transition-colors"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m} className="bg-deep-navy">{m} Months</option>
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
                      readOnly
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none cursor-not-allowed opacity-70"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Results Panel */}
          <div className="lg:col-span-7">
            {calculation && (
              <div className="glass-panel rounded-3xl p-8 h-full flex flex-col justify-between relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="mb-8">
                  <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Net Financial Benefit</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl md:text-6xl font-serif font-bold text-white">
                      {formatCurrency(calculation.netBenefit)}
                    </span>
                    <span className="text-emerald-green text-sm font-bold bg-emerald-green/10 px-2 py-1 rounded-full">
                      Saved
                    </span>
                  </div>
                </div>

                {/* Visual Graph */}
                <div className="space-y-6 mb-8">
                  {/* Tax Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-400 font-medium">Tax You Would Pay (Selling)</span>
                      <span className="text-white font-bold">{formatCurrency(calculation.taxOnSale)}</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((calculation.taxOnSale / (calculation.taxOnSale + calculation.totalInterest)) * 100, 100)}%` }}
                        className="h-full bg-red-500/80"
                      />
                    </div>
                  </div>

                  {/* Interest Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gold-muted font-medium">Interest You Pay (Pledging)</span>
                      <span className="text-white font-bold">{formatCurrency(calculation.totalInterest)}</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((calculation.totalInterest / (calculation.taxOnSale + calculation.totalInterest)) * 100, 100)}%` }}
                        className="h-full bg-gold-muted"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase mb-1">Collateral Required</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(calculation.collateralRequired)}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase mb-1">LTV Ratio</p>
                    <p className="text-lg font-bold text-white">50%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
