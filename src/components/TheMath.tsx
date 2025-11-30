import React from 'react'
import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, AlertTriangle, ShieldCheck, Banknote, Landmark } from 'lucide-react'

export function TheMath() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] -translate-y-1/2" />
            </div>

            <div className="container-mobile relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-sans font-bold mb-6">
                        <span className="text-white">The Indian Bitcoin </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-bright to-gold-muted">Dilemma</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Selling your Bitcoin triggers a cascade of taxes and lost opportunity. <br className="hidden md:block" />
                        Pledging unlocks value while keeping your asset secure.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* The Selling Trap */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="h-full bg-surface/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-red-500/30 transition-colors duration-300 flex flex-col">
                            <div className="mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <TrendingDown size={28} />
                                </div>
                                <h3 className="text-2xl font-sans font-bold text-white mb-2">Selling Bitcoin</h3>
                                <p className="text-red-400 font-medium tracking-wide uppercase text-sm">The Taxable Event</p>
                            </div>

                            <div className="space-y-4 flex-grow">
                                <DilemmaPoint
                                    icon={<Banknote size={18} />}
                                    text="Flat 30% Tax on Gains"
                                    subtext="No slab benefits, straight cut."
                                    variant="danger"
                                />
                                <DilemmaPoint
                                    icon={<AlertTriangle size={18} />}
                                    text="4% Cess + 1% TDS"
                                    subtext="Additional surcharges eat into profits."
                                    variant="danger"
                                />
                                <DilemmaPoint
                                    icon={<TrendingDown size={18} />}
                                    text="Loss of Future Growth"
                                    subtext="You miss the rally to $100k+."
                                    variant="danger"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* The Pledg Advantage */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="h-full bg-surface/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:border-emerald-500/30 transition-colors duration-300 flex flex-col">
                            <div className="mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <TrendingUp size={28} />
                                </div>
                                <h3 className="text-2xl font-sans font-bold text-white mb-2">Pledging Bitcoin</h3>
                                <p className="text-emerald-400 font-medium tracking-wide uppercase text-sm">The Smart Strategy</p>
                            </div>

                            <div className="space-y-4 flex-grow">
                                <DilemmaPoint
                                    icon={<Landmark size={18} />}
                                    text="0% Tax on Liquidity"
                                    subtext="Loans are not taxable income."
                                    variant="success"
                                />
                                <DilemmaPoint
                                    icon={<ShieldCheck size={18} />}
                                    text="Retain 100% Ownership"
                                    subtext="Your Bitcoin stays yours."
                                    variant="success"
                                />
                                <DilemmaPoint
                                    icon={<TrendingUp size={18} />}
                                    text="Capture Future Upside"
                                    subtext="Participate in the full bull run."
                                    variant="success"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function DilemmaPoint({ icon, text, subtext, variant }: { icon: React.ReactNode, text: string, subtext: string, variant: 'danger' | 'success' }) {
    const colors = variant === 'danger'
        ? "text-red-400 bg-red-500/5 border-red-500/10"
        : "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"

    const iconColor = variant === 'danger' ? "text-red-500" : "text-emerald-500"

    return (
        <div className={`flex items-start gap-4 p-4 rounded-xl border ${colors} transition-colors hover:bg-opacity-10`}>
            <div className={`mt-1 ${iconColor} shrink-0`}>
                {icon}
            </div>
            <div>
                <p className="text-white font-bold text-base mb-1">{text}</p>
                <p className="text-gray-400 text-sm leading-snug">{subtext}</p>
            </div>
        </div>
    )
}
