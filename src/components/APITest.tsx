import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react'

export function APITest() {
  const [coinapiStatus, setCoinapiStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [coingeckoStatus, setCoingeckoStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [coinapiData, setCoinapiData] = useState<any>(null)
  const [coingeckoData, setCoingeckoData] = useState<any>(null)

  const testCoinAPI = async () => {
    try {
      setCoinapiStatus('loading')
      const response = await fetch('https://rest.coinapi.io/v1/exchangerate/BTC/INR', {
        headers: {
          'X-CoinAPI-Key': '9ac8fa25'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCoinapiData(data)
        setCoinapiStatus('success')
      } else {
        const errorData = await response.json()
        console.error('CoinAPI Error:', errorData)
        setCoinapiStatus('error')
      }
    } catch (error) {
      console.error('CoinAPI Error:', error)
      setCoinapiStatus('error')
    }
  }

  const testCoinGecko = async () => {
    try {
      setCoingeckoStatus('loading')
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr&include_24hr_change=true')
      
      if (response.ok) {
        const data = await response.json()
        setCoingeckoData(data)
        setCoingeckoStatus('success')
      } else {
        setCoingeckoStatus('error')
      }
    } catch (error) {
      console.error('CoinGecko Error:', error)
      setCoingeckoStatus('error')
    }
  }

  useEffect(() => {
    testCoinAPI()
    testCoinGecko()
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-2 border-primary-400/20 rounded-2xl p-6 backdrop-blur-sm shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-neopop-gradient">API Status Test</h3>
      
      <div className="space-y-4">
        {/* CoinAPI Test */}
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            {coinapiStatus === 'loading' && <RefreshCw className="h-5 w-5 animate-spin text-yellow-400" />}
            {coinapiStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
            {coinapiStatus === 'error' && <XCircle className="h-5 w-5 text-red-400" />}
            <span className="font-semibold">CoinAPI</span>
          </div>
          <div className="text-sm">
            {coinapiStatus === 'success' && coinapiData && (
              <span className="text-green-400">₹{coinapiData.rate?.toLocaleString()}</span>
            )}
            {coinapiStatus === 'error' && (
              <span className="text-red-400">Failed</span>
            )}
            {coinapiStatus === 'loading' && (
              <span className="text-yellow-400">Testing...</span>
            )}
          </div>
        </div>

        {/* CoinGecko Test */}
        <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-3">
            {coingeckoStatus === 'loading' && <RefreshCw className="h-5 w-5 animate-spin text-yellow-400" />}
            {coingeckoStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
            {coingeckoStatus === 'error' && <XCircle className="h-5 w-5 text-red-400" />}
            <span className="font-semibold">CoinGecko</span>
          </div>
          <div className="text-sm">
            {coingeckoStatus === 'success' && coingeckoData && (
              <span className="text-green-400">₹{coingeckoData.bitcoin?.inr?.toLocaleString()}</span>
            )}
            {coingeckoStatus === 'error' && (
              <span className="text-red-400">Failed</span>
            )}
            {coingeckoStatus === 'loading' && (
              <span className="text-yellow-400">Testing...</span>
            )}
          </div>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => {
            testCoinAPI()
            testCoinGecko()
          }}
          className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
        >
          Retry Tests
        </button>

        {/* Debug Info */}
        {(coinapiData || coingeckoData) && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-gray-400">Debug Info</summary>
            <div className="mt-2 p-3 bg-gray-800/50 rounded text-xs">
              <div className="mb-2">
                <strong>CoinAPI:</strong>
                <pre className="mt-1 text-gray-300">{JSON.stringify(coinapiData, null, 2)}</pre>
              </div>
              <div>
                <strong>CoinGecko:</strong>
                <pre className="mt-1 text-gray-300">{JSON.stringify(coingeckoData, null, 2)}</pre>
              </div>
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
