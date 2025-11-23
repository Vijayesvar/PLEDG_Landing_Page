import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, Shield, AlertCircle, AlertTriangle, XCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { NeopopButton } from './NeopopButton'
import { NeopopCard } from './NeopopCard'

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
  const [loanAmount, setLoanAmount] = useState<number>(0)
  const [loanTerm, setLoanTerm] = useState<number>(6)
  const [interestRate, setInterestRate] = useState<number>(12)
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null)

  const calculateLoan = useCallback(() => {
    if (loanAmount === 0) {
      alert('Please enter your desired loan amount')
      return
    }

    if (loanAmount < 10000) {
      alert('Minimum loan amount is ₹10,000')
      return
    }

    if (loanAmount > 10000000) {
      alert('Maximum loan amount is ₹1,00,00,000')
      return
    }

    if (interestRate < 12) {
      alert('Minimum interest rate is 12%')
      return
    }

    if (interestRate > 24) {
      alert('Maximum interest rate is 24%')
      return
    }

    // Calculate collateral required (200% of loan amount for 50% LTV)
    const collateralRequired = loanAmount * 2

    // Calculate monthly payment using EMI formula
    const monthlyRate = interestRate / 100 / 12
    let monthlyPayment: number
    let totalInterest: number

    if (monthlyRate === 0) {
      // If interest rate is 0%
      monthlyPayment = loanAmount / loanTerm
      totalInterest = 0
    } else {
      // EMI formula: P * [r(1+r)^n] / [(1+r)^n - 1]
      const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)
      const denominator = Math.pow(1 + monthlyRate, loanTerm) - 1
      monthlyPayment = numerator / denominator
      totalInterest = (monthlyPayment * loanTerm) - loanAmount
    }

    const totalRepayment = loanAmount + totalInterest

    // Calculate tax savings
    // Assuming loan amount represents 50% of capital gains (LTV ratio)
    const taxRate = 0.312 // 30% + 4% cess
    const taxOnSale = loanAmount * taxRate // Tax on selling Bitcoin equivalent to loan amount
    const taxWithLoan = 0 // No tax on loans
    const taxSavings = taxOnSale
    const netBenefit = taxSavings - totalInterest

    // Risk Thresholds
    // Warning Zone: LTV > 71.6% => Collateral Value < Loan Amount / 0.716
    const warningCollateral = loanAmount / 0.716
    // Liquidation Zone: LTV >= 83.33% => Collateral Value <= Loan Amount / 0.8333
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
  }, [loanAmount, loanTerm, interestRate])

  return (
    <section id="calculator" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loan Calculator</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Calculate how much you can borrow against your Bitcoin and see the potential tax savings
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <NeopopCard
              variant="glow"
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="text-primary-400" size={24} />
                <h3 className="text-2xl font-bold">Calculate Your Loan</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Desired Loan Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      value={loanAmount || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        // Allow any value during typing, validation happens on blur or calculate
                        setLoanAmount(value)
                      }}
                      onBlur={(e) => {
                        const value = Number(e.target.value)
                        if (value < 10000 && value > 0) {
                          setLoanAmount(10000)
                        } else if (value > 10000000) {
                          setLoanAmount(10000000)
                        }
                      }}
                      placeholder="Enter loan amount (₹10,000 - ₹1,00,00,000)"
                      className="input-field pl-8"
                      min={10000}
                      max={10000000}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Range: ₹10,000 - ₹1,00,00,000</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Loan Term</label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="input-field"
                  >
                    <option value={3}>3 months</option>
                    <option value={6}>6 months</option>
                    <option value={9}>9 months</option>
                    <option value={12}>12 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (APR)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        // Allow any value during typing, validation happens on blur or calculate
                        setInterestRate(value)
                      }}
                      onBlur={(e) => {
                        const value = Number(e.target.value)
                        if (value < 12 && value > 0) {
                          setInterestRate(12)
                        } else if (value > 24) {
                          setInterestRate(24)
                        }
                      }}
                      step="0.1"
                      min="12"
                      max="24"
                      className="input-field pr-8"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Range: 12% - 24% APR</p>
                </div>

                <NeopopButton
                  onClick={calculateLoan}
                  variant="neopop"
                  size="lg"
                  className="w-full"
                >
                  <Calculator size={20} className="mr-2" />
                  Calculate Loan
                </NeopopButton>
              </div>
            </NeopopCard>

            {/* Calculator Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Loan Details */}
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-primary-400" size={20} />
                  <h4 className="text-lg font-semibold">Loan Details</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Loan Amount:</span>
                    <span className="font-semibold">
                      {calculation ? formatCurrency(calculation.loanAmount) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collateral Required:</span>
                    <span className="font-semibold text-yellow-400">
                      {calculation ? formatCurrency(calculation.collateralRequired) : '₹0'}
                    </span>
                  </div>
                  {/* Monthly Payment Removed */}
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Interest:</span>
                    <span className="font-semibold">
                      {calculation ? formatCurrency(calculation.totalInterest) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Repayment:</span>
                    <span className="font-semibold">
                      {calculation ? formatCurrency(calculation.totalRepayment) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tax Savings */}
              <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="text-green-400" size={20} />
                  <h4 className="text-lg font-semibold text-green-400">Tax Savings</h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-800/30 p-3 rounded-lg mb-4">
                    <p className="text-xs text-green-200">
                      <strong>Assumption:</strong> Loan amount represents 50% of capital gains (LTV ratio).
                      Tax calculated on loan amount as if selling equivalent Bitcoin.
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax on Selling Bitcoin (31.2%):</span>
                    <span className="font-semibold text-red-400">
                      {calculation ? formatCurrency(calculation.taxOnSale) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax with Pledg Loan:</span>
                    <span className="font-semibold text-green-400">
                      {calculation ? formatCurrency(calculation.taxWithLoan) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-green-500/20 pt-3">
                    <span className="text-green-300 font-semibold">Total Tax Savings:</span>
                    <span className="font-bold text-green-400 text-lg">
                      {calculation ? formatCurrency(calculation.taxSavings) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Benefit */}
              <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="text-blue-400" size={20} />
                  <h4 className="text-lg font-semibold text-blue-400">Net Benefit</h4>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-300 mb-2">
                    {calculation ? formatCurrency(calculation.netBenefit) : '₹0'}
                  </div>
                  <p className="text-sm text-gray-300">Total savings after loan costs</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Risk Thresholds */}
          {calculation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Warning Zone */}
              <div className="bg-orange-900/20 p-6 rounded-xl border border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="text-orange-400" size={20} />
                  <h4 className="text-lg font-semibold text-orange-400">Warning Zone</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>LTV &gt; 71.6%</strong></p>
                  <p>Collateral Value drops to: <span className="text-orange-300 font-bold">{formatCurrency(calculation.warningCollateral)}</span></p>
                  <p className="text-xs mt-2 text-gray-400">
                    Status: Margin Call. Automated notifications (SMS, Email, App) are sent to the borrower.
                  </p>
                </div>
              </div>

              {/* Liquidation Zone */}
              <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="text-red-400" size={20} />
                  <h4 className="text-lg font-semibold text-red-400">Liquidation Zone</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>LTV ≥ 83.33%</strong></p>
                  <p>Collateral Value drops to: <span className="text-red-300 font-bold">{formatCurrency(calculation.liquidationCollateral)}</span></p>
                  <p className="text-xs mt-2 text-gray-400">
                    Status: Liquidation. Automated partial liquidation is triggered to restore LTV.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 bg-yellow-900/20 p-6 rounded-xl border border-yellow-500/20"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-yellow-300 mb-2">Important Disclaimer</h4>
                <p className="text-sm text-gray-300">
                  This calculator is for illustrative purposes only. Actual loan terms, interest rates, and eligibility criteria may vary.
                  Tax calculations assume the loan amount represents 50% of capital gains (LTV ratio) and are based on current Indian tax laws (30% + 4% cess on crypto gains).
                  Please consult with a tax advisor for your specific situation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
