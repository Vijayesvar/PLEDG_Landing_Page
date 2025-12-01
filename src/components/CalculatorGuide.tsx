import { DollarSign, Percent, HelpCircle, ArrowRight } from 'lucide-react'

export function CalculatorGuide() {
    return (
        <div className="h-full flex flex-col justify-center space-y-10 p-4">
            <div>
                <h3 className="text-3xl font-serif font-bold text-white mb-2">How it Works</h3>
                <p className="text-gray-400">Understand the math behind borrowing vs. selling your Bitcoin.</p>
            </div>

            <div className="space-y-8">
                <GuideStep
                    icon={<DollarSign size={20} />}
                    title="Enter Loan Amount"
                    description="Input the amount of cash you need. We'll calculate the required Bitcoin collateral based on a 50% LTV (Loan-to-Value) ratio."
                />
                <GuideStep
                    icon={<Percent size={20} />}
                    title="Estimate Capital Gains"
                    description="Enter the profit you would make if you sold your Bitcoin today. In India, Bitcoin gains are taxed at a flat 30% + 4% cess."
                />
                <GuideStep
                    icon={<HelpCircle size={20} />}
                    title="Review Loan Terms"
                    description="Adjust the loan tenure and interest rate. Pledg offers competitive rates starting from 13.5% APR."
                />
                <GuideStep
                    icon={<ArrowRight size={20} />}
                    title="See Your Savings"
                    description="We compare the cost of selling (31.2% tax) vs. borrowing (interest). Often, the tax savings outweigh the interest cost, resulting in a Net Benefit."
                />
            </div>

            <p className="text-xs text-gray-600 italic border-t border-white/5 pt-6">
                *Calculations are estimates. Actual terms may vary based on market conditions.
            </p>
        </div>
    )
}

function GuideStep({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="flex gap-5">
            <div className="shrink-0 w-12 h-12 rounded-full bg-gold-muted/10 flex items-center justify-center text-gold-muted border border-gold-muted/20">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-bold text-lg mb-1 font-serif">{title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    )
}
