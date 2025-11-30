import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice'
import { TrendingUp, ShieldCheck, Wallet } from 'lucide-react'

interface LoanCalculation {
  loanAmount: number
  collateralRequired: number
  collateralRequiredBTC: number
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
  const { data: btcData, loading: btcLoading } = useBitcoinPrice()
  const [loanAmount, setLoanAmount] = useState<number>(500000)
  const [capitalGains, setCapitalGains] = useState<number>(200000)
  const [loanTerm, setLoanTerm] = useState<number>(12)
  const interestRate = 13.5
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null)

  const calculateLoan = useCallback(() => {
    // Calculate collateral required (200% of loan amount for 50% LTV)
    const collateralRequired = loanAmount * 2
    const btcPrice = btcData?.price || 8500000 // Fallback price if API fails/loading
    const collateralRequiredBTC = collateralRequired / btcPrice

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
      collateralRequiredBTC,
      totalInterest,
      totalRepayment,
      taxOnSale,
      taxWithLoan,
      taxSavings,
      netBenefit,
      warningCollateral,
      liquidationCollateral,
    })
  }, [loanAmount, capitalGains, loanTerm, interestRate, btcData])

  // Auto-calculate on change
  useEffect(() => {
    calculateLoan()
  }, [calculateLoan])

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gold-muted/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-mobile relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-sans font-bold mb-6 tracking-tight">
            <span className="text-white">Calculate Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-bright to-gold-muted">Advantage</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-sans text-lg leading-relaxed">
            See exactly how much you save by pledging your Bitcoin instead of selling it.
            <br />
            <span className="text-sm text-gold-muted/80 mt-2 inline-block">
              {btcLoading ? "Fetching live BTC price..." : `Live BTC Price: ${formatCurrency(btcData?.price || 0)}`}
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="glass-panel rounded-3xl p-8 space-y-10 border border-white/5 bg-obsidian/60 backdrop-blur-xl h-full shadow-2xl shadow-black/50">
              {/* Loan Amount Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs uppercase tracking-widest text-gold-muted font-bold flex items-center gap-2">
                    <Wallet size={14} /> Loan Amount
                  </label>
                  <div className="text-right">
                    <span className="text-white font-serif font-bold text-3xl block">{formatNumber(loanAmount)}</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full">
                  <input
                    type="range"
                    min="50000"
                    max="5000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className="absolute h-full bg-gradient-to-r from-gold-muted to-gold-bright rounded-full"
                    style={{ width: `${((loanAmount - 50000) / (5000000 - 50000)) * 100}%` }}
                  />
                  <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 -ml-2 pointer-events-none transition-all duration-75"
                    style={{ left: `${((loanAmount - 50000) / (5000000 - 50000)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600 font-mono">
                  <span>₹50k</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* Capital Gains Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                    <TrendingUp size={14} /> Potential Capital Gains
                  </label>
                  <div className="text-right">
                    <span className="text-white font-serif font-bold text-3xl block">{formatNumber(capitalGains)}</span>
                    <span className="text-xs text-gray-500">INR</span>
                  </div>
                </div>
                <div className="relative h-2 bg-white/5 rounded-full">
                  <input
                    type="range"
                    min="0"
                    max={loanAmount}
                    step="5000"
                    value={capitalGains}
                    onChange={(e) => setCapitalGains(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className="absolute h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    style={{ width: `${(capitalGains / loanAmount) * 100}%` }}
                  />
                  <div
                    className="absolute h-4 w-4 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 -ml-2 pointer-events-none transition-all duration-75"
                    style={{ left: `${(capitalGains / loanAmount) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Estimated profit if you sold equivalent Bitcoin today.
                </p>
              </div>

              {/* Term & Interest */}
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-3">
                    Term
                  </label>
                  <div className="relative">
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-gold-muted transition-colors appearance-none cursor-pointer hover:bg-white/10"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                        <option key={m} value={m} className="bg-obsidian text-white">{m} Months</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 font-medium mb-3">
                    Interest (APR)
                  </label>
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white flex justify-between items-center opacity-80">
                    <span className="font-mono">{interestRate}</span>
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7"
          >
            {calculation && (
              <div className="glass-panel rounded-3xl p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden border border-white/5 bg-[#0A0A0A] shadow-2xl">

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-8">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                      Net Financial Benefit
                    </h3>
                  </div>

                  {/* Main Amount & Badge */}
                  <div className="flex items-center justify-between mb-12">
                    <div className="relative">

                      <span className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tight">
                        {formatCurrency(calculation.netBenefit)}
                      </span>
                    </div>

                    <div className="bg-emerald-900/30 border border-emerald-500/20 px-6 py-3 rounded-full flex flex-col items-center justify-center text-center min-w-[100px]">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mb-1" />
                      <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest leading-tight">
                        You<br />Save
                      </span>
                    </div>
                  </div>

                  {/* Comparison Bars */}
                  <div className="space-y-8 mb-12">
                    {/* Tax Bar */}
                    <div className="group">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-400 font-medium">Tax You Would Pay (Selling)</span>
                        <span className="text-white font-bold font-mono">{formatCurrency(calculation.taxOnSale)}</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((calculation.taxOnSale / (calculation.taxOnSale + calculation.totalInterest)) * 100, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#FF5F5F]" // Specific red from image
                        />
                      </div>
                    </div>

                    {/* Interest Bar */}
                    <div className="group">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="text-gray-400 font-medium">Interest You Pay (Pledging)</span>
                        <span className="text-white font-bold font-mono">{formatCurrency(calculation.totalInterest)}</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((calculation.totalInterest / (calculation.taxOnSale + calculation.totalInterest)) * 100, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-[#E5C07B]" // Specific gold from image
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">Collateral Required</p>
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-white mb-1">{formatCurrency(calculation.collateralRequired)}</span>
                      <span className="text-sm text-gray-400 font-mono">
                        ≈ {calculation.collateralRequiredBTC.toFixed(4)} BTC
                      </span>
                    </div>
                  </div>
                  <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-bold">LTV Ratio</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-3xl font-bold text-white">50%</span>
                      <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wide">
                        <ShieldCheck size={14} />
                        Safe
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Loan to Value Ratio
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
