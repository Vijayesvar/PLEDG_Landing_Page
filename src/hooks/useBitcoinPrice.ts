import { useState, useEffect } from 'react'
import axios from 'axios'

interface BitcoinData {
    price: number
    change24h: number
    lastUpdated: string
}

export function useBitcoinPrice() {
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

    return { data, loading, error, refetch: fetchPrice }
}
