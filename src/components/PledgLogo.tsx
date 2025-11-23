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
        <linearGradient id="pledg-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7341ff" />
          <stop offset="100%" stopColor="#611bf8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#pledg-g)" />
      <path
        d="M8 6v12 M8 6h6a4 4 0 0 1 0 8H8"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
