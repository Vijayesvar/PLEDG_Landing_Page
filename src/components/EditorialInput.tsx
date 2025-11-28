import React from 'react'
import { cn } from '@/lib/utils'

interface EditorialInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    icon?: React.ReactNode
}

export const EditorialInput = React.forwardRef<HTMLInputElement, EditorialInputProps>(
    ({ className, label, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-muted transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'input-editorial',
                            icon && 'pl-8',
                            className
                        )}
                        {...props}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-muted group-focus-within:w-full transition-all duration-500 ease-out" />
                </div>
            </div>
        )
    }
)

EditorialInput.displayName = 'EditorialInput'
