import { formatCurrency } from '@/lib/utils'
import { TrendingUp, AlertTriangle, XCircle, HelpCircle } from 'lucide-react'

interface CalculatorResultsProps {
    calculation: {
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
    onShowGuide: () => void
}

export function CalculatorResults({ calculation, onShowGuide }: CalculatorResultsProps) {
    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-end mb-4">
                <button
                    onClick={onShowGuide}
                    className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
                >
                    <HelpCircle size={12} /> SHOW GUIDE
                </button>
            </div>

            {/* Net Benefit Card */}
            <div className="bg-gradient-to-br from-gold-muted/10 to-transparent border border-gold-muted/20 rounded-3xl p-8 mb-6 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-gold-muted mb-2">Net Benefit</p>
                    <div className="text-5xl md:text-6xl font-serif font-bold text-white mb-2">
                        {formatCurrency(calculation.netBenefit)}
                    </div>
                    <p className="text-gray-400 text-sm">
                        {calculation.netBenefit >= 0
                            ? "Total savings compared to selling your Bitcoin"
                            : "Additional cost compared to selling your Bitcoin"}
                    </p>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gold-muted/5">
                    <TrendingUp size={150} />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Collateral Required</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(calculation.collateralRequired)}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Total Interest</p>
                    <p className="text-lg font-bold text-red-400">{formatCurrency(calculation.totalInterest)}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Tax Saved</p>
                    <p className="text-lg font-bold text-emerald-400">{formatCurrency(calculation.taxPayable)}</p>
                </div>
            </div>

            {/* Risk Analysis */}
            <div>
                <h4 className="text-sm font-serif text-gray-400 mb-4 uppercase tracking-widest">Risk Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-orange-500/20 bg-orange-500/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle size={14} className="text-orange-500" />
                            <span className="text-xs font-bold text-orange-500 uppercase">Margin Call</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Bitcoin Price Drop</p>
                        <p className="text-xl font-bold text-white">{formatCurrency(calculation.marginCallPrice)}</p>
                    </div>
                    <div className="border border-red-500/20 bg-red-500/5 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle size={14} className="text-red-500" />
                            <span className="text-xs font-bold text-red-500 uppercase">Liquidation</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">Bitcoin Price Drop</p>
                        <p className="text-xl font-bold text-white">{formatCurrency(calculation.liquidationPrice)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
