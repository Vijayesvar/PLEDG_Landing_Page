import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    children: React.ReactNode
}

export const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {

        const variants = {
            primary: 'btn-editorial-primary',
            outline: 'btn-editorial',
            ghost: 'text-gold-muted hover:text-gold-bright transition-colors',
        }

        const sizes = {
            sm: 'px-4 py-2 text-xs',
            md: 'px-6 py-3 text-sm',
            lg: 'px-8 py-4 text-base',
        }

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    variant !== 'primary' && sizes[size], // Primary has its own padding in CSS
                    className
                )}
                disabled={loading || props.disabled}
                {...props}
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    children
                )}
            </motion.button>
        )
    }
)

PremiumButton.displayName = 'PremiumButton'
