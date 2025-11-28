import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GoldBitcoinProps {
    className?: string
}

export function GoldBitcoin({ className }: GoldBitcoinProps) {
    return (
        <div className={cn("relative w-32 h-32 md:w-48 md:h-48 perspective-1000", className)}>
            <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: 360 }}
                transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center justify-center backface-hidden border-4 border-[#daa520]">
                    <div className="w-[85%] h-[85%] rounded-full border-2 border-[#b8860b] flex items-center justify-center bg-gradient-to-tr from-[#e6c278] to-[#c5a059]">
                        <span className="text-6xl md:text-8xl font-sans font-bold text-[#8b4513] drop-shadow-md">₿</span>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#ffd700] via-[#b8860b] to-[#ffd700] shadow-[0_0_30px_rgba(255,215,0,0.3)] flex items-center justify-center backface-hidden border-4 border-[#daa520]"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="w-[85%] h-[85%] rounded-full border-2 border-[#b8860b] flex items-center justify-center bg-gradient-to-tr from-[#e6c278] to-[#c5a059]">
                        <span className="text-6xl md:text-8xl font-sans font-bold text-[#8b4513] drop-shadow-md">₿</span>
                    </div>
                </div>

                {/* Edge/Thickness (Simulated with multiple layers or just a side element if needed, but for simple 3D rotation, front/back is often enough. 
            To give it thickness, we can add a pseudo-element or a side ring, but CSS 3D thickness is tricky. 
            For now, let's stick to a high-quality 2-sided coin which looks good in rotation.) 
        */}
            </motion.div>
        </div>
    )
}
