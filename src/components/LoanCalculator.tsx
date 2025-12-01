import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice'
import { TrendingUp, Wallet, Plus, Minus } from 'lucide-react'

interface LoanCalculation {
    loanAmount: number
    collateralRequired: number
    collateralRequiredBTC: number
    totalInterest: number
    totalRepayment: number
    taxPayable: number
    netBenefit: number
    liquidationPrice: number
    liquidationValue: number
    marginCallPrice: number
    marginCallValue: number
    ltv: number
}

export function LoanCalculator() {
    const { data: btcData, loading: btcLoading } = useBitcoinPrice()

    // Inputs
    const [loanAmount, setLoanAmount] = useState<number>(50000)
    const [loanTerm, setLoanTerm] = useState<number>(12)
    const [interestRate, setInterestRate] = useState<number>(14.5)
    const [capitalGains, setCapitalGains] = useState<number>(0)

    const [calculation, setCalculation] = useState<LoanCalculation | null>(null)

    const calculateLoan = useCallback(() => {
        const currentBtcPrice = btcData?.price || 8500000

        // 1. Liquidity & Cost
        // LTV is fixed at 50% for this calculator's logic base
        const ltv = 0.5
        const collateralRequired = loanAmount / ltv
        const collateralRequiredBTC = collateralRequired / currentBtcPrice

        // Interest Calculation (EMI based)
        const monthlyRate = interestRate / 100 / 12
        let totalInterest = 0

        if (monthlyRate === 0) {
            totalInterest = 0
        } else {
            const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)
            const denominator = Math.pow(1 + monthlyRate, loanTerm) - 1
            const emi = numerator / denominator
            totalInterest = (emi * loanTerm) - loanAmount
        }

        const totalRepayment = loanAmount + totalInterest

        // 2. Tax Logic
        // Effective Tax Rate = 30% Base + 4% Cess = 31.2%
        const taxRate = 0.312
        const taxPayable = capitalGains * taxRate

        // 3. Net Benefit
        // Benefit = Tax Saved - Interest Paid
        const netBenefit = taxPayable - totalInterest

        // 4. Risk
        // Liquidation at 83.33% LTV
        const liquidationLTV = 0.8333
        const liquidationPrice = (loanAmount / liquidationLTV) / collateralRequiredBTC
        const liquidationValue = loanAmount / liquidationLTV

        // Margin Call at 70% LTV
        const marginCallLTV = 0.70
        const marginCallPrice = (loanAmount / marginCallLTV) / collateralRequiredBTC
        const marginCallValue = loanAmount / marginCallLTV

        setCalculation({
            loanAmount,
            collateralRequired,
            collateralRequiredBTC,
            totalInterest,
            totalRepayment,
            taxPayable,
            netBenefit,
            liquidationPrice,
            liquidationValue,
            marginCallPrice,
            marginCallValue,
            ltv: ltv * 100
        })

    }, [loanAmount, loanTerm, interestRate, capitalGains, btcData])

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
                        <span className="text-white">Sell vs </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-bright to-gold-muted">Borrow</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-sans text-lg leading-relaxed">
                        See the real economic trade-off between selling your Bitcoin and pledging it for liquidity.
                        <br />
                        <span className="text-sm text-gold-muted/80 mt-2 inline-block">
                            {btcLoading ? "Fetching live BTC price..." : `Live BTC Price: ${formatCurrency(btcData?.price || 0)}`}
                        </span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* INPUTS PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col gap-6"
                    >
                        <div className="glass-panel rounded-3xl p-8 space-y-8 border border-white/5 bg-obsidian/60 backdrop-blur-xl shadow-2xl shadow-black/50">

                            {/* 1. Liquidity Inputs */}
                            <div className="space-y-6">
                                <h3 className="text-xs uppercase tracking-widest text-gold-muted font-bold flex items-center gap-2 mb-4">
                                    <Wallet size={14} /> Liquidity Needs
                                </h3>

                                {/* Loan Amount */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-sm text-gray-400">Loan Amount</label>
                                        <div className="text-right min-w-[180px]">
                                            <span className="text-white font-mono font-bold text-2xl block tabular-nums tracking-tight">{formatNumber(loanAmount)}</span>
                                            <span className="text-[10px] text-gray-500 uppercase">INR</span>
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
                                            className="absolute h-4 w-4 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                                            style={{ left: `${((loanAmount - 50000) / (5000000 - 50000)) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Term & Interest */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-2">Tenure</label>
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
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-2">Interest (APR)</label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setInterestRate(prev => Math.max(14.5, prev - 0.5))}
                                                disabled={interestRate <= 14.5}
                                                className="w-10 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <div className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white flex justify-between items-center transition-colors hover:bg-white/10 cursor-default">
                                                <input
                                                    type="number"
                                                    value={interestRate}
                                                    readOnly
                                                    className="bg-transparent border-none outline-none font-mono w-full text-white placeholder-gray-500 text-center cursor-default"
                                                />
                                                <span className="text-gray-500 text-xs">%</span>
                                            </div>
                                            <button
                                                onClick={() => setInterestRate(prev => Math.min(25, prev + 0.5))}
                                                disabled={interestRate >= 25}
                                                className="w-10 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            {/* 2. Capital Gains Input */}
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                                    <TrendingUp size={14} /> Capital Gains
                                </h3>

                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <label className="block text-sm text-gray-300">
                                            If you sold this BTC today, how much profit would you make?
                                        </label>
                                        <div className="text-right min-w-[180px]">
                                            <span className="text-white font-mono font-bold text-2xl block tabular-nums tracking-tight">{formatNumber(capitalGains)}</span>
                                            <span className="text-[10px] text-gray-500 uppercase">INR</span>
                                        </div>
                                    </div>

                                    <div className="relative h-2 bg-white/5 rounded-full mb-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000000"
                                            step="5000"
                                            value={capitalGains}
                                            onChange={(e) => setCapitalGains(Number(e.target.value))}
                                            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div
                                            className="absolute h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                                            style={{ width: `${(capitalGains / 10000000) * 100}%` }}
                                        />
                                        <div
                                            className="absolute h-4 w-4 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                                            style={{ left: `${(capitalGains / 10000000) * 100}%` }}
                                        />
                                    </div>

                                    <p className="text-[10px] text-gray-500 mt-2 leading-relaxed">
                                        Approximate profit (Sale Price - Buy Price). Used to estimate tax impact.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RESULTS PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-7 space-y-6"
                    >
                        {calculation && (
                            <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-[#0A0A0A] shadow-2xl relative overflow-hidden flex flex-col h-full">
                                {/* Header: Net Benefit */}
                                <div className="text-center mb-10">
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                                        {calculation.netBenefit >= 0 ? 'Potential Savings' : 'Net Cost'}
                                    </p>
                                    <div className={`text-5xl md:text-6xl font-mono font-bold tracking-tight ${calculation.netBenefit >= 0 ? 'text-emerald-400' : 'text-orange-400'}`}>
                                        {formatCurrency(Math.abs(calculation.netBenefit))}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-3">
                                        {calculation.netBenefit >= 0
                                            ? 'saved by borrowing instead of selling'
                                            : 'additional cost compared to selling'}
                                    </p>
                                </div>

                                {/* Body: Comparison */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    {/* Cost of Selling */}
                                    <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-red-400">Cost of Selling</span>
                                        </div>
                                        <p className="text-3xl font-mono font-bold text-white mb-1">{formatCurrency(calculation.taxPayable)}</p>
                                        <p className="text-xs text-gray-500">Tax Payable (31.2%)</p>
                                    </div>

                                    {/* Cost of Borrowing */}
                                    <div className="bg-gold-muted/5 rounded-2xl p-6 border border-gold-muted/10">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-2 h-2 rounded-full bg-gold-muted" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-gold-muted">Cost of Borrowing</span>
                                        </div>
                                        <p className="text-3xl font-mono font-bold text-white mb-1">{formatCurrency(calculation.totalInterest)}</p>
                                        <p className="text-xs text-gray-500">Total Interest ({interestRate}%)</p>
                                    </div>
                                </div>

                                {/* Footer: Key Metrics */}
                                <div className="mt-auto pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Collateral Required</p>
                                        <p className="text-xl font-bold text-white">{calculation.collateralRequiredBTC.toFixed(4)} BTC</p>
                                        <p className="text-xs text-gray-600">≈ {formatCurrency(calculation.collateralRequired)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Liquidation Price</p>
                                        <p className="text-xl font-bold text-red-400">{formatCurrency(calculation.liquidationPrice)}</p>
                                        <p className="text-xs text-gray-600">Safe until BTC drops to this</p>
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
