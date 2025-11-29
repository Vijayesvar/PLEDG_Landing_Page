import { cn } from '@/lib/utils'

interface PledgLogoProps {
  className?: string
}

export function PledgLogo({ className }: PledgLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-gold-muted', className)}
    >
      {/* Hexagon Shape */}
      <path
        d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 L50 5Z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-lg"
      />

      {/* Stylized 'P' */}
      <path
        d="M35 35 V75 M35 35 H60 C70 35 70 55 60 55 H35"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
