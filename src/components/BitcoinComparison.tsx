import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'

// Function to format numbers with Indian comma system
function formatIndianNumber(amount: number): string {
  return amount.toLocaleString('en-IN')
}

export function BitcoinComparison() {
  // Example: ₹2,00,00,000 (2 Cr) worth of Bitcoin
  const btcValue = 20000000 // ₹2,00,00,000 (2 Cr)
  const assumedGain = 10000000 // ₹1,00,00,000 (1 Cr) - assumed capital gains
  const taxOnSale = 3120000 // Fixed value as per design
  const netAmount = 16880000 // Fixed value as per design

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
      {/* Selling Bitcoin - The Problem */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#1A0505] p-8 rounded-3xl border border-red-900/30 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="flex items-center gap-3 mb-8 relative z-10">
          <AlertCircle className="text-red-500" size={24} />
          <h3 className="text-2xl font-serif font-bold text-red-100">Selling Bitcoin</h3>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="bg-red-950/30 p-5 rounded-2xl border border-red-900/20">
            <div className="text-sm text-red-300/70 mb-1 font-medium">Bitcoin Value</div>
            <div className="text-2xl font-bold text-red-100 font-serif">₹{formatIndianNumber(btcValue)}</div>
          </div>

          <div className="bg-red-950/30 p-5 rounded-2xl border border-red-900/20">
            <div className="text-sm text-red-300/70 mb-1 font-medium">Assumed Capital Gains</div>
            <div className="text-2xl font-bold text-red-100 font-serif">₹{formatIndianNumber(assumedGain)}</div>
          </div>

          <div className="bg-red-950/30 p-5 rounded-2xl border border-red-900/20">
            <div className="text-sm text-red-300/70 mb-1 font-medium">Tax on Gains (31.2%)</div>
            <div className="text-2xl font-bold text-red-400 font-serif">₹{formatIndianNumber(taxOnSale)}</div>
          </div>

          <div className="bg-red-900/20 p-5 rounded-2xl border border-red-500/30">
            <div className="text-sm text-red-200 mb-1 font-medium">Net Amount After Tax</div>
            <div className="text-2xl font-bold text-red-100 font-serif">₹{formatIndianNumber(netAmount)}</div>
          </div>
        </div>

        <div className="mt-8 p-5 bg-red-950/50 rounded-2xl border border-red-900/30 relative z-10">
          <p className="text-sm text-red-200/80 leading-relaxed">
            <span className="text-red-100 font-bold block mb-1">Result:</span>
            You lose <span className="text-red-400 font-bold">₹{formatIndianNumber(taxOnSale)}</span> in taxes and miss out on Bitcoin's potential future growth.
          </p>
        </div>
      </motion.div>

      {/* Using Pledg - The Solution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#051A0A] p-8 rounded-3xl border border-green-900/30 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

        <div className="flex items-center gap-3 mb-8 relative z-10">
          <CheckCircle className="text-green-500" size={24} />
          <h3 className="text-2xl font-serif font-bold text-green-100">Using Pledg</h3>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="bg-green-950/30 p-5 rounded-2xl border border-green-900/20">
            <div className="text-sm text-green-300/70 mb-1 font-medium">Bitcoin Value (Collateral)</div>
            <div className="text-2xl font-bold text-green-100 font-serif">₹{formatIndianNumber(btcValue)}</div>
          </div>

          <div className="bg-green-950/30 p-5 rounded-2xl border border-green-900/20">
            <div className="text-sm text-green-300/70 mb-1 font-medium">Loan Amount (50% LTV)</div>
            <div className="text-2xl font-bold text-green-100 font-serif">₹{formatIndianNumber(10000000)}</div>
          </div>

          <div className="bg-green-900/20 p-5 rounded-2xl border border-green-500/30">
            <div className="text-sm text-green-200 mb-1 font-medium">Tax on Loan</div>
            <div className="text-2xl font-bold text-green-400 font-serif">₹0</div>
          </div>

          {/* Spacer to align with the left card height if needed, or just empty space */}
          <div className="h-[88px] hidden md:block" />
        </div>

        <div className="mt-8 p-5 bg-green-950/50 rounded-2xl border border-green-900/30 relative z-10">
          <p className="text-sm text-green-200/80 leading-relaxed">
            <span className="text-green-100 font-bold block mb-1">Result:</span>
            You get <span className="text-green-400 font-bold">₹{formatIndianNumber(10000000)}</span> in liquidity with zero tax, while keeping your Bitcoin for potential growth.
          </p>
        </div>
      </motion.div>
    </div>
  )
}