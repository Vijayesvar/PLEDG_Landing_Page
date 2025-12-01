import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency, formatNumber } from '@/lib/utils'
import { useBitcoinPrice } from '@/hooks/useBitcoinPrice'
import { Wallet } from 'lucide-react'
import { CalculatorGuide } from './CalculatorGuide'
import { CalculatorResults } from './CalculatorResults'

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
    const [interestRate] = useState<number>(14.5)
    const [capitalGains, setCapitalGains] = useState<number>(0)

    const [calculation, setCalculation] = useState<LoanCalculation | null>(null)
    const [showResults, setShowResults] = useState(false)

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

    const handleCalculate = () => {
        setShowResults(true)
    }

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
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* INPUTS PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col"
                    >
                        <div className="glass-panel rounded-3xl p-8 space-y-8 border border-white/5 bg-obsidian/60 backdrop-blur-xl shadow-2xl shadow-black/50 h-full flex flex-col">

                            {/* 1. Liquidity Inputs */}
                            <div className="space-y-6">
                                <h3 className="text-xs uppercase tracking-widest text-gold-muted font-bold flex items-center gap-2 mb-4">
                                    <Wallet size={14} /> Liquidity Needs
                                </h3>

                                {/* Loan Amount */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gold-muted">Loan Amount (₹)</label>
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
                                            className="absolute h-4 w-4 bg-gold-bright rounded-full shadow-lg top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                                            style={{ left: `${((loanAmount - 50000) / (5000000 - 50000)) * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-3xl font-serif font-bold text-white">
                                        {formatNumber(loanAmount)}
                                    </div>
                                </div>


                                {/* Capital Gains Input */}
                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gold-muted">Estimated Capital Gains (₹)</label>
                                    </div>

                                    <div className="relative h-2 bg-white/5 rounded-full">
                                        <input
                                            type="range"
                                            min="0"
                                            max="5000000"
                                            step="5000"
                                            value={capitalGains}
                                            onChange={(e) => setCapitalGains(Number(e.target.value))}
                                            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div
                                            className="absolute h-full bg-gradient-to-r from-gold-muted to-gold-bright rounded-full"
                                            style={{ width: `${(capitalGains / 5000000) * 100}%` }}
                                        />
                                        <div
                                            className="absolute h-4 w-4 bg-gold-bright rounded-full shadow-lg top-1/2 -translate-y-1/2 -ml-2 pointer-events-none"
                                            style={{ left: `${(capitalGains / 5000000) * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-3xl font-serif font-bold text-white">
                                        {formatNumber(capitalGains)}
                                    </div>
                                </div>

                                {/* Term & Interest */}
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Term (Months)</label>
                                        <div className="relative border-b border-white/10 pb-2">
                                            <select
                                                value={loanTerm}
                                                onChange={(e) => setLoanTerm(Number(e.target.value))}
                                                className="w-full bg-transparent text-xl font-serif text-white focus:outline-none appearance-none cursor-pointer"
                                            >
                                                {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                                    <option key={m} value={m} className="bg-obsidian text-white">{m} Months</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Interest (APR)</label>
                                        <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                            <input
                                                type="number"
                                                value={interestRate}
                                                readOnly
                                                className="bg-transparent border-none outline-none font-serif text-xl text-white w-full"
                                            />
                                            <span className="text-gray-500 text-sm">%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8">
                                <button
                                    onClick={handleCalculate}
                                    className="w-full bg-gold-muted hover:bg-gold-bright text-black font-bold py-4 px-6 rounded-none uppercase tracking-widest transition-all duration-300"
                                >
                                    Calculate Savings
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* RESULTS / GUIDE PANEL */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-7 flex flex-col"
                    >
                        <div className="glass-panel rounded-3xl p-8 border border-white/5 bg-[#0A0A0A] shadow-2xl relative overflow-hidden h-full">
                            {!showResults ? (
                                <CalculatorGuide />
                            ) : (
                                calculation && (
                                    <CalculatorResults
                                        calculation={calculation}
                                        onShowGuide={() => setShowResults(false)}
                                    />
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
