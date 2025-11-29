import { motion } from 'framer-motion'
import { Bitcoin, Lock, Banknote, ArrowRight, ShieldCheck, Building2 } from 'lucide-react'

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden bg-surface">
            <div className="container-mobile relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-sans font-bold mb-6">
                        <span className="text-white">How It </span>
                        <span className="text-gold-muted italic">Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A seamless, secure process designed for speed and safety.
                    </p>
                </motion.div>

                {/* Animation Container */}
                <div className="relative max-w-4xl mx-auto mb-20">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Step 1: Deposit */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative group"
                        >
                            <div className="glass-panel p-8 rounded-3xl text-center relative z-10 h-full hover:border-gold-muted/30 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-gold-muted/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Bitcoin className="text-gold-muted w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">1. Pledge Bitcoin</h3>
                                <p className="text-sm text-gray-400">Deposit your Bitcoin into a secure, insured custodial wallet.</p>

                                {/* Animation Element */}
                                <motion.div
                                    animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                    className="absolute top-1/2 -right-12 text-gold-muted hidden md:block"
                                >
                                    <ArrowRight size={24} />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Step 2: Secure */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative group"
                        >
                            <div className="glass-panel p-8 rounded-3xl text-center relative z-10 h-full hover:border-emerald-green/30 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-emerald-green/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Lock className="text-emerald-green w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">2. Assets Secured</h3>
                                <p className="text-sm text-gray-400">Your assets are locked in BitGo institutional custody.</p>

                                {/* Animation Element */}
                                <motion.div
                                    animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                    className="absolute top-1/2 -right-12 text-emerald-green hidden md:block"
                                >
                                    <ArrowRight size={24} />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Step 3: Receive Cash */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="relative group"
                        >
                            <div className="glass-panel p-8 rounded-3xl text-center relative z-10 h-full hover:border-gold-bright/30 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-gold-bright/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Banknote className="text-gold-bright w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">3. Get Cash</h3>
                                <p className="text-sm text-gray-400">Receive INR directly in your bank account within 24 hours.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-white/5 pt-12">
                    <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-8">Trusted Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* BitGo Placeholder */}
                        <div className="flex items-center gap-3 group">
                            <ShieldCheck className="w-8 h-8 text-white group-hover:text-gold-muted transition-colors" />
                            <span className="text-xl font-bold text-white group-hover:text-gold-muted transition-colors">BitGo</span>
                        </div>

                        {/* NBFC Placeholder */}
                        <div className="flex items-center gap-3 group">
                            <Building2 className="w-8 h-8 text-white group-hover:text-gold-muted transition-colors" />
                            <span className="text-xl font-bold text-white group-hover:text-gold-muted transition-colors">Regulated NBFC</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
