import { motion } from 'framer-motion'
import { XCircle, CheckCircle } from 'lucide-react'

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function BitcoinComparison() {
  const btcValue = 20000000
  const assumedGain = 10000000
  const taxOnSale = 3120000
  const netAmount = 16880000
  const loanAmount = 10000000

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
      {/* Selling Bitcoin - The Problem */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-red-500/5 rounded-3xl blur-2xl transition-opacity opacity-50 group-hover:opacity-100" />
        <div className="relative h-full bg-surface/40 backdrop-blur-md border border-red-500/10 rounded-3xl p-6 md:p-8 flex flex-col hover:border-red-500/20 transition-colors">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
              <XCircle size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Selling Bitcoin</h3>
              <p className="text-sm text-red-400 font-medium tracking-wide uppercase">Taxable Event</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 flex-1">
            <Row label="Bitcoin Value" value={btcValue} />
            <Row label="Assumed Capital Gains" value={assumedGain} />
            <Row
              label="Tax on Gains (31.2%)"
              value={taxOnSale}
              valueColor="text-red-400"
              prefix="-"
            />

            <div className="pt-6 border-t border-white/5 mt-auto">
              <div className="flex justify-between items-end">
                <span className="text-sm text-gray-400 font-medium">Net Amount</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {formatCurrency(netAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="mt-8 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <p className="text-sm text-red-200/80 leading-relaxed">
              <span className="font-bold text-red-400 block mb-1">Result:</span>
              You lose <span className="text-white font-bold">{formatCurrency(taxOnSale)}</span> in taxes and lose ownership of your asset.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Using Pledg - The Solution */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-2xl transition-opacity opacity-50 group-hover:opacity-100" />
        <div className="relative h-full bg-surface/40 backdrop-blur-md border border-emerald-500/10 rounded-3xl p-6 md:p-8 flex flex-col hover:border-emerald-500/20 transition-colors">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white">Using Pledg</h3>
              <p className="text-sm text-emerald-400 font-medium tracking-wide uppercase">Tax-Free Liquidity</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 flex-1">
            <Row label="Bitcoin Value (Collateral)" value={btcValue} />
            <Row label="Loan Amount (50% LTV)" value={loanAmount} />
            <Row
              label="Tax on Loan"
              value={0}
              valueColor="text-emerald-400"
            />

            <div className="pt-6 border-t border-white/5 mt-auto">
              <div className="flex justify-between items-end">
                <span className="text-sm text-gray-400 font-medium">Liquidity Received</span>
                <span className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Result Box */}
          <div className="mt-8 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <p className="text-sm text-emerald-200/80 leading-relaxed">
              <span className="font-bold text-emerald-400 block mb-1">Result:</span>
              Get <span className="text-white font-bold">{formatCurrency(loanAmount)}</span> in cash while keeping your Bitcoin for future growth.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Row({ label, value, valueColor = "text-gray-200", prefix = "" }: { label: string, value: number, valueColor?: string, prefix?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className={`text-xl font-serif font-bold ${valueColor}`}>
        {prefix}{formatCurrency(value)}
      </span>
    </div>
  )
}