import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import axios from 'axios'

interface BitcoinPriceData {
  price: number
  change24h: number
  changePercentage: number
  lastUpdated: Date
}

export function BitcoinPrice() {
  const [priceData, setPriceData] = useState<BitcoinPriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBitcoinPrice = async () => {
    try {
      setLoading(true)
      setError(null)

      const WORKER_URL = "https://lucky-wave-c3fe.wolf07279.workers.dev"
      const response = await axios.get(`${WORKER_URL}?t = ${Date.now()} `)
      const btcData = response.data.bitcoin

      const newPriceData = {
        price: btcData.usd,
        change24h: 0, // Hardcoded as per instruction
        changePercentage: 0, // Hardcoded as per instruction
        lastUpdated: new Date()
      }

      setPriceData(newPriceData)
      localStorage.setItem('lastBitcoinPrice', JSON.stringify(newPriceData))

    } catch (err) {
      console.error('Worker API failed:', err)

      const lastPriceData = localStorage.getItem('lastBitcoinPrice')
      if (lastPriceData) {
        try {
          const parsedData = JSON.parse(lastPriceData)
          setPriceData({
            ...parsedData,
            lastUpdated: new Date(parsedData.lastUpdated)
          })
          setError('Using last recorded price - API temporarily unavailable')
        } catch (parseErr) {
          console.error('Failed to parse last price data:', parseErr)
          setError('Failed to fetch Bitcoin price')
        }
      } else {
        setError('Failed to fetch Bitcoin price')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price)

  const formatChange = (change: number) => `${change >= 0 ? '+' : ''}${change.toFixed(2)}% `

  if (loading && !priceData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-400/10 via-primary-500/5 to-primary-600/10 border-2 border-primary-400/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl"
      >
        <div className="flex items-center justify-center gap-3">
          <RefreshCw className="h-5 w-5 animate-spin text-primary-400" />
          <span className="text-gray-300">Loading Bitcoin price...</span>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-red-500/10 via-red-600/5 to-red-700/10 border-2 border-red-500/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl"
      >
        <div className="text-center">
          <p className="text-red-400 mb-2">Failed to load Bitcoin price</p>
          <button
            onClick={fetchBitcoinPrice}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    )
  }

  if (!priceData) return null

  const isPositive = priceData.changePercentage >= 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-primary-400/10 via-primary-500/5 to-primary-600/10 border-2 border-primary-400/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">₿</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Bitcoin Price</h3>
            <p className="text-sm text-gray-400">Live in INR</p>
          </div>
        </div>
        <button onClick={fetchBitcoinPrice} disabled={loading}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50">
          <RefreshCw className={`h - 4 w - 4 text - gray - 400 ${loading ? 'animate-spin' : ''} `} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">{formatPrice(priceData.price)}</span>
          <div className={`flex items - center gap - 1 px - 3 py - 1 rounded - full ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} `}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span className="font-semibold">{formatChange(priceData.changePercentage)}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400">
          Last updated: {priceData.lastUpdated.toLocaleTimeString('en-IN')}
        </div>
        <div className="pt-3 border-t border-gray-700">
          <p className="text-sm text-gray-300">
            <strong>Your Bitcoin Value:</strong> If you have 1 BTC, it's worth{' '}
            <span className="text-primary-400 font-semibold">{formatPrice(priceData.price)}</span> today.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
