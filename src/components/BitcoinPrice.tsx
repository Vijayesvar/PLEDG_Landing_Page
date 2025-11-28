import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import axios from 'axios'
import { EditorialCard } from './EditorialCard'
import { formatCurrency, cn } from '@/lib/utils'
import { GoldBitcoin } from './GoldBitcoin'

interface BitcoinData {
    price: number
    change24h: number
    lastUpdated: string
}

interface BitcoinPriceProps {
    className?: string
}

export function BitcoinPrice({ className }: BitcoinPriceProps) {
    const [data, setData] = useState<BitcoinData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchPrice = async () => {
        try {
            setLoading(true)
            const WORKER_URL = "https://lucky-wave-c3fe.wolf07279.workers.dev"
            const response = await axios.get(`${WORKER_URL}?t=${Date.now()}`)
            const btc = response.data.bitcoin

            setData({
                price: btc.inr,
                change24h: btc.change24h,
                lastUpdated: new Date().toLocaleTimeString()
            })
            setError(false)
        } catch (err) {
            console.error('Failed to fetch Bitcoin price:', err)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPrice()
        const interval = setInterval(fetchPrice, 60000) // Update every minute
        return () => clearInterval(interval)
    }, [])

    if (error) {
        return (
            <EditorialCard className={cn("w-full max-w-sm mx-auto backdrop-blur-md bg-obsidian/80 border-red-500/20", className)}>
                <div className="flex items-center justify-between text-red-400">
                    <span>Unavailable</span>
                    <button onClick={fetchPrice} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <RefreshCw size={16} />
                    </button>
                </div>
            </EditorialCard>
        )
    }

    return (
        <EditorialCard className={cn("relative w-full max-w-sm mx-auto backdrop-blur-md bg-obsidian/80 border-gold-muted/20 hover:border-gold-muted/40 transition-colors duration-500 group overflow-visible", className)}>
            <div className="flex items-center justify-between mb-4 relative z-20">
                <div>
                    <p className="text-xs font-medium text-gold-muted uppercase tracking-widest mb-1">Live Bitcoin Price</p>
                    <div className="flex items-baseline gap-2">
                        {loading ? (
                            <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
                        ) : (
                            <h3 className="text-3xl font-sans font-bold text-white">
                                {data ? formatCurrency(data.price) : '---'}
                            </h3>
                        )}
                    </div>
                </div>
                <div className="relative">
                    <GoldBitcoin className="w-20 h-20 md:w-24 md:h-24" />
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-20">
                <div className="flex items-center gap-2">
                    {loading ? (
                        <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
                    ) : (
                        <div className={`flex items-center gap-1 text-sm font-medium ${data && data.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {data && data.change24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            <span>{data ? Math.abs(data.change24h).toFixed(2) : '0.00'}%</span>
                        </div>
                    )}
                    <span className="text-xs text-gray-500">24h Change</span>
                </div>
                <div className="text-xs text-gray-600 font-mono pr-12">
                    BTC / INR
                </div>
            </div>
        </EditorialCard>
    )
}
