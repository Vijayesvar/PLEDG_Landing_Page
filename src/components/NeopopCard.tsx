import { motion } from 'framer-motion'
import { ReactNode, useRef, useState, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface NeopopCardProps {
  children: ReactNode
  variant?: 'default' | 'glow' | 'glass' | 'gradient'
  className?: string
  hover?: boolean
  glow?: boolean
  tilt?: boolean
}

export function NeopopCard({
  children,
  variant = 'default',
  className,
  hover = true,
  glow = false,
  tilt = true
}: NeopopCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const baseClasses = "transition-all duration-500 backdrop-blur-sm relative"

  const variantClasses = {
    default: "bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-2 border-primary-400/20 rounded-2xl p-6 shadow-lg",
    glow: "card-neopop-glow",
    glass: "glass-card p-6",
    gradient: "bg-gradient-to-br from-primary-400/20 via-primary-500/10 to-primary-600/20 border-2 border-primary-400/40 rounded-2xl p-6 shadow-xl"
  }

  const hoverClasses = hover ? "hover:-translate-y-2 hover:shadow-neopop hover:border-primary-400/50" : ""

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tilt || !isHovering) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotateX(0)
    setRotateY(0)
  }

  const tiltStyle = tilt && isHovering
    ? {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`,
      transformStyle: 'preserve-3d' as const,
    }
    : {}

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        glow && "neopop-glow",
        className
      )}
    >
      {/* Animated gradient border effect */}
      {variant === 'glow' && isHovering && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-400 via-pink-500 to-accent-cyan opacity-20 blur-xl -z-10 animate-gradient-shift" />
      )}

      {children}
    </motion.div>
  )
}
