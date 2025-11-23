import { useState } from 'react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NeopopInputProps {
  type?: 'text' | 'email' | 'tel' | 'number' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  icon?: ReactNode
  label?: string
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  className?: string
}

export function NeopopInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  label,
  error,
  success = false,
  disabled = false,
  required = false,
  className
}: NeopopInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("relative", className)}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <motion.input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full px-6 py-4 bg-gray-900/80 border-2 rounded-2xl transition-all duration-300 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none",
            icon ? "pl-12" : "",
            focused ? "border-primary-400 ring-4 ring-primary-400/20" : "border-primary-400/30",
            error ? "border-red-500 ring-4 ring-red-500/20" : "",
            success ? "border-green-500 ring-4 ring-green-500/20" : "",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
        />
        
        {success && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
