import { useEffect, useRef } from 'react'

export function GoldSandBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        let orbs: Orb[] = []

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        class Orb {
            x: number
            y: number
            radius: number
            vx: number
            vy: number
            color: string
            blur: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                // Large radius for smooth gradients
                this.radius = Math.random() * 300 + 200
                // Very slow movement
                this.vx = (Math.random() - 0.5) * 0.2
                this.vy = (Math.random() - 0.5) * 0.2
                this.blur = Math.random() * 50 + 50

                // Premium Gold & Aurora Palette
                const colors = [
                    'rgba(197, 160, 89, 0.15)',  // Muted Gold
                    'rgba(230, 194, 120, 0.1)',  // Bright Gold
                    'rgba(74, 55, 21, 0.2)',     // Deep Bronze
                    'rgba(139, 69, 19, 0.1)'     // Saddle Brown (Warmth)
                ]
                this.color = colors[Math.floor(Math.random() * colors.length)]
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                // Bounce off edges (smoothly)
                if (this.x < -this.radius) this.x = canvas!.width + this.radius
                if (this.x > canvas!.width + this.radius) this.x = -this.radius
                if (this.y < -this.radius) this.y = canvas!.height + this.radius
                if (this.y > canvas!.height + this.radius) this.y = -this.radius
            }

            draw() {
                if (!ctx) return

                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                )

                // Extract RGB from RGBA for gradient stops
                // This is a simplified approach; for production, regex or color lib is better.
                // Assuming format 'rgba(r, g, b, a)'

                gradient.addColorStop(0, this.color)
                gradient.addColorStop(1, 'rgba(0,0,0,0)')

                ctx.fillStyle = gradient
                ctx.globalCompositeOperation = 'screen' // Blending for glow
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const init = () => {
            orbs = []
            // Fewer orbs for a cleaner look
            const numberOfOrbs = 8
            for (let i = 0; i < numberOfOrbs; i++) {
                orbs.push(new Orb())
            }
        }

        const animate = () => {
            if (!ctx) return
            // Clear with a very slight opacity to create trails? No, clean clear for this effect.
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            orbs.forEach(orb => {
                orb.update()
                orb.draw()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        window.addEventListener('resize', () => {
            resizeCanvas()
            init()
        })

        resizeCanvas()
        init()
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{
                opacity: 0.6,
                filter: 'blur(60px)', // Global blur for extra smoothness
                background: 'transparent'
            }}
        />
    )
}
