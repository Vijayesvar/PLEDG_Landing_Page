import { cn } from '@/lib/utils'

interface PledgLogoProps {
  className?: string
}

export function PledgLogo({ className }: PledgLogoProps) {
  return (
    <svg
      className={cn('h-8 w-8', className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-label="Pledg logo"
    >
      <defs>
        <linearGradient id="pledg-gold-fold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bf953f" />
          <stop offset="25%" stopColor="#fcf6ba" />
          <stop offset="50%" stopColor="#b38728" />
          <stop offset="75%" stopColor="#fbf5b7" />
          <stop offset="100%" stopColor="#aa771c" />
        </linearGradient>
        <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
          <feOffset dx="0.5" dy="0.5" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The Golden Fold Concept */}
      <path
        d="M7 4V20M7 4H14C17.5 4 19 6.5 19 9.5C19 12.5 17.5 15 14 15H7"
        stroke="url(#pledg-gold-fold)"
        strokeWidth="3.5"
        strokeLinecap="butt"
        strokeLinejoin="round"
        fill="none"
        filter="url(#drop-shadow)"
      />

      {/* Fold Detail / Highlight */}
      <path
        d="M7 4H14C17.5 4 19 6.5 19 9.5C19 12.5 17.5 15 14 15H7"
        stroke="white"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        fill="none"
        className="mix-blend-overlay"
      />
    </svg>
  )
}
