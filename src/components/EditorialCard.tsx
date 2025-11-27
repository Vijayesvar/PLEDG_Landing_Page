import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EditorialCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode
    hoverEffect?: boolean
}

export const EditorialCard = React.forwardRef<HTMLDivElement, EditorialCardProps>(
    ({ className, children, hoverEffect = true, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    'card-editorial',
                    hoverEffect && 'hover:translate-y-[-4px]',
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

EditorialCard.displayName = 'EditorialCard'
