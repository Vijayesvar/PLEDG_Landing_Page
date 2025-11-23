import { motion } from 'framer-motion'
import { AlertCircle, Target } from 'lucide-react'

// Function to format numbers with Indian comma system
function formatIndianNumber(amount: number): string {
  return amount.toLocaleString('en-IN')
}

export function BitcoinComparison() {
  // Example: ₹2,00,00,000 (2 Cr) worth of Bitcoin
  const btcValue = 20000000 // ₹2,00,00,000 (2 Cr)
  const assumedGain = 10000000 // ₹1,00,00,000 (1 Cr) - assumed capital gains
  const taxOnSale = calculateTax(assumedGain) // Tax calculated on assumed gain, not full value

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Selling Bitcoin - The Problem */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-red-900/20 p-8 rounded-2xl border border-red-500/30"
      >
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="text-red-400" size={24} />
          <h3 className="text-2xl font-bold text-red-400">Selling Bitcoin</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-red-800/30 p-4 rounded-xl">
            <div className="text-sm text-red-200 mb-2">Bitcoin Value</div>
            <div className="text-2xl font-bold text-red-300">₹{formatIndianNumber(btcValue)}</div>
          </div>

          <div className="bg-red-800/30 p-4 rounded-xl">
            <div className="text-sm text-red-200 mb-2">Assumed Capital Gains</div>
            <div className="text-2xl font-bold text-red-300">₹{formatIndianNumber(assumedGain)}</div>
          </div>

          <div className="bg-red-800/30 p-4 rounded-xl">
            <div className="text-sm text-red-200 mb-2">Tax on Gains (31.2%)</div>
            <div className="text-2xl font-bold text-red-300">₹{formatIndianNumber(taxOnSale)}</div>
          </div>

          <div className="bg-red-800/30 p-4 rounded-xl border-2 border-red-500/50">
            <div className="text-sm text-red-200 mb-2">Net Amount After Tax</div>
            <div className="text-2xl font-bold text-red-300">₹{formatIndianNumber(btcValue - taxOnSale)}</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-800/20 rounded-xl">
          <div className="text-sm text-red-200">
            <strong>Result:</strong> You lose ₹{formatIndianNumber(taxOnSale)} in taxes (assuming ₹{formatIndianNumber(assumedGain)} capital gains) and miss out on Bitcoin's potential future growth.
          </div>
        </div>
      </motion.div>

      {/* Using Pledg - The Solution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-green-900/20 p-8 rounded-2xl border border-green-500/30"
      >
        <div className="flex items-center gap-3 mb-6">
          <Target className="text-green-400" size={24} />
          <h3 className="text-2xl font-bold text-green-400">Using Pledg</h3>
        </div>

        <div className="space-y-4">
          <div className="bg-green-800/30 p-4 rounded-xl">
            <div className="text-sm text-green-200 mb-2">Bitcoin Value (Collateral)</div>
            <div className="text-2xl font-bold text-green-300">₹{formatIndianNumber(btcValue)}</div>
          </div>

          <div className="bg-green-800/30 p-4 rounded-xl">
            <div className="text-sm text-green-200 mb-2">Loan Amount (50% LTV)</div>
            <div className="text-2xl font-bold text-green-300">₹{formatIndianNumber(btcValue * 0.5)}</div>
          </div>

          <div className="bg-green-800/30 p-4 rounded-xl border-2 border-green-500/50">
            <div className="text-sm text-green-200 mb-2">Tax on Loan</div>
            <div className="text-2xl font-bold text-green-300">₹0</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-800/20 rounded-xl">
          <div className="text-sm text-green-200">
            <strong>Result:</strong> You get ₹{formatIndianNumber(btcValue * 0.5)} in liquidity with zero tax, while keeping your Bitcoin for potential growth.
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function calculateTax(amount: number): number {
  const taxRate = 0.312 // 30% + 4% cess
  return amount * taxRate
}