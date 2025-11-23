import { useEffect, useState } from 'react'

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
}

export function AnimatedBackground() {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        // Generate random particles
        const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 100 + 50,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 5,
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {/* Animated gradient orbs */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full opacity-20 blur-3xl"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        background: `radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.2), transparent)`,
                        animation: `float ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
                    }}
                />
            ))}

            {/* Additional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-pink/10 animate-gradient-shift" />
        </div>
    )
}
