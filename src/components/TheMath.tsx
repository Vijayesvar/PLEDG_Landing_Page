import { motion } from 'framer-motion'
import { XCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react'

// Helper to format currency
const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(value)
}

export function TheMath() {
    const btcValue = 10000000
    const assumedGain = 5000000
    const taxOnSale = 1560000
    const netAmount = 8440000
    const loanAmount = 5000000

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container-mobile relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-sans font-bold mb-4">
                        <span className="text-white">The Indian Bitcoin </span>
                        <span className="text-gold-bright">Dilemma</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Why traditional financial solutions don't work for Bitcoin holders in India. See the numbers for yourself.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Selling Card (Red/Danger) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-red-500/5 rounded-3xl blur-2xl transition-opacity opacity-50 group-hover:opacity-100" />
                        <div className="h-full bg-surface/40 backdrop-blur-md border border-red-500/10 rounded-3xl p-6 md:p-8 flex flex-col hover:border-red-500/20 transition-colors relative z-10">

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                                    <XCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-sans font-bold text-white">Selling Bitcoin</h3>
                                    <p className="text-sm text-red-400 font-medium tracking-wide uppercase">Taxable Event</p>
                                </div>
                            </div>

                            {/* Numerical Breakdown */}
                            <div className="space-y-4 mb-8">
                                <Row label="Bitcoin Value" value={btcValue} />
                                <Row label="Assumed Capital Gains" value={assumedGain} />
                                <Row
                                    label="Tax on Gains (31.2%)"
                                    value={taxOnSale}
                                    valueColor="text-red-400"
                                    prefix="-"
                                />
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm text-gray-400 font-medium">Net Amount</span>
                                        <span className="text-2xl font-sans font-bold text-white">
                                            {formatCurrency(netAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Qualitative Impacts */}
                            <div className="bg-red-500/5 rounded-xl p-5 border border-red-500/10 mt-auto">
                                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                                    <TrendingDown size={16} />
                                    The Consequences
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <XCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                        <span>Immediate <strong>30% tax + 4% cess</strong> on your hard-earned gains.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <XCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                                        <span><strong>Loss of ownership.</strong> You miss out if Bitcoin goes to $100k.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pledging Card (Green/Safe) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl blur-2xl transition-opacity opacity-50 group-hover:opacity-100" />
                        <div className="h-full bg-surface/40 backdrop-blur-md border border-emerald-500/10 rounded-3xl p-6 md:p-8 flex flex-col hover:border-emerald-500/20 transition-colors relative z-10">

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-sans font-bold text-white">Using Pledg</h3>
                                    <p className="text-sm text-emerald-400 font-medium tracking-wide uppercase">Tax-Free Liquidity</p>
                                </div>
                            </div>

                            {/* Numerical Breakdown */}
                            <div className="space-y-4 mb-8">
                                <Row label="Bitcoin Value (Collateral)" value={btcValue} />
                                <Row label="Loan Amount (50% LTV)" value={loanAmount} />
                                <Row
                                    label="Tax on Loan"
                                    value={0}
                                    valueColor="text-emerald-400"
                                />
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm text-gray-400 font-medium">Liquidity Received</span>
                                        <span className="text-2xl font-sans font-bold text-white">
                                            {formatCurrency(loanAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Qualitative Impacts */}
                            <div className="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/10 mt-auto">
                                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                                    <TrendingUp size={16} />
                                    The Pledg Advantage
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                                        <span><strong>Zero Tax Event.</strong> Loans are not taxable income.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                                        <span><strong>Keep Future Gains.</strong> You still own the Bitcoin.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function Row({ label, value, valueColor = "text-gray-200", prefix = "" }: { label: string, value: number, valueColor?: string, prefix?: string }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">{label}</span>
            <span className={`text-xl font-sans font-bold ${valueColor}`}>
                {prefix}{formatCurrency(value)}
            </span>
        </div>
    )
}
