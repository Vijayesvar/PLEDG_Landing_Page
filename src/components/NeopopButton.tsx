import { motion } from 'framer-motion'
import { ReactNode, useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface NeopopButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'neopop' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
  loading?: boolean
}

export function NeopopButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  disabled = false,
  loading = false
}: NeopopButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const baseClasses = "font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center relative overflow-hidden"

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  }

  const variantClasses = {
    primary: "bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-lg hover:shadow-glow-lg",
    secondary: "border-2 border-primary-400/30 text-primary-400 hover:bg-primary-400/10 hover:border-primary-400/60 hover:shadow-glow-sm backdrop-blur-sm",
    neopop: "bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-neopop hover:shadow-neopop-lg",
    glow: "bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-glow-md hover:shadow-glow-lg neopop-glow"
  }

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setMousePosition({ x, y })
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()

      setRipples([...ripples, { x, y, id }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
      }, 600)
    }

    onClick?.()
  }

  const magneticStyle = isHovering && !disabled
    ? {
      transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px) scale(1.05)`,
    }
    : {}

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={disabled || loading}
      style={magneticStyle}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  )
}
