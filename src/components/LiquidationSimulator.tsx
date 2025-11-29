import { useState } from 'react'
import { Info, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export function LiquidationSimulator() {
    const [btcPrice, setBtcPrice] = useState<number>(6000000)
    const ltv = 50
    const liquidationThreshold = 0.8333
    const dropPercentage = 1 - (ltv / 100) / liquidationThreshold
    const liquidationPrice = btcPrice * (1 - dropPercentage)
    const marginCallPrice = btcPrice * (1 - (dropPercentage * 0.8))

    return (
        <div className="glass-panel p-6 rounded-2xl mt-8 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Info size={20} className="text-gold-bright" />
                Liquidation Simulator
            </h3>
            <p className="text-gray-400 text-sm mb-6">
                See how safe your position is. Adjust the Bitcoin price to see when a margin call would occur.
            </p>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Current Bitcoin Price (₹)</span>
                        <span className="text-white font-bold">{formatCurrency(btcPrice)}</span>
                    </div>
                    <input
                        type="range"
                        min="1000000"
                        max="10000000"
                        step="100000"
                        value={btcPrice}
                        onChange={(e) => setBtcPrice(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-muted"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-orange-900/20 border border-orange-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-1 text-orange-400">
                            <AlertTriangle size={16} />
                            <span className="text-xs font-bold uppercase">Margin Call Price</span>
                        </div>
                        <p className="text-xl font-bold text-white">{formatCurrency(marginCallPrice)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            You get a warning when BTC drops to this price.
                        </p>
                    </div>

                    <div className="bg-red-900/20 border border-red-500/20 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-1 text-red-400">
                            <AlertTriangle size={16} />
                            <span className="text-xs font-bold uppercase">Liquidation Price</span>
                        </div>
                        <p className="text-xl font-bold text-white">{formatCurrency(liquidationPrice)}</p>
                        <p className="text-xs text-gray-500 mt-1">
                            Assets are sold only if BTC drops to this price.
                        </p>
                    </div>
                </div>

                <div className="bg-emerald-green/10 border border-emerald-green/20 p-4 rounded-xl text-center">
                    <p className="text-emerald-green font-bold text-lg">
                        {((btcPrice - liquidationPrice) / btcPrice * 100).toFixed(1)}% Safety Buffer
                    </p>
                    <p className="text-xs text-gray-400">
                        Bitcoin would have to crash by this much for you to be liquidated.
                    </p>
                </div>
            </div>
        </div>
    )
}
