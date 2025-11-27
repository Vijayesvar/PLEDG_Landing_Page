import { HelpCircle, DollarSign, Percent, ArrowRight } from 'lucide-react'

export function CalculatorGuide() {
    const steps = [
        {
            icon: DollarSign,
            title: "Enter Loan Amount",
            description: "Input the amount of cash you need. We'll calculate the required Bitcoin collateral based on a 50% LTV (Loan-to-Value) ratio."
        },
        {
            icon: Percent,
            title: "Estimate Capital Gains",
            description: "Enter the profit you would make if you sold your Bitcoin today. In India, Bitcoin gains are taxed at a flat 30% + 4% cess."
        },
        {
            icon: HelpCircle,
            title: "Review Loan Terms",
            description: "Adjust the loan tenure and interest rate. Pledg offers competitive rates starting from 13.5% APR."
        },
        {
            icon: ArrowRight,
            title: "See Your Savings",
            description: "We compare the cost of selling (31.2% tax) vs. borrowing (interest). Often, the tax savings outweigh the interest cost, resulting in a Net Benefit."
        }
    ]

    return (
        <div className="h-full flex flex-col justify-center p-8 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">How it Works</h3>
                <p className="text-gray-400 text-sm">
                    Understand the math behind borrowing vs. selling your Bitcoin.
                </p>
            </div>

            <div className="space-y-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-muted/10 flex items-center justify-center text-gold-muted border border-gold-muted/20">
                            <step.icon size={20} />
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-1">{step.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 italic">
                    *Calculations are estimates. Actual terms may vary based on market conditions.
                </p>
            </div>
        </div>
    )
}
