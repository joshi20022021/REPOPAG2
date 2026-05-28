import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface BalloonProps {
  color: string
  x: number
  delay: number
  size: number
}

function SingleBalloon({ color, x, delay, size }: BalloonProps) {
  const drift = useMemo(() => (Math.random() - 0.5) * 60, [])

  return (
    <motion.div
      className="balloon-wrap"
      style={{ left: `${x}%` }}
      initial={{ y: 0 }}
      animate={{ y: '-120vh', x: [0, drift, -drift / 2, drift / 2, 0] }}
      transition={{
        y: { duration: 10 + delay * 1.5, delay, repeat: Infinity, ease: 'linear' },
        x: { duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        className="balloon-body"
        style={{
          width: size,
          height: size * 1.22,
          background: `radial-gradient(circle at 32% 28%, ${color}dd, ${color})`,
          boxShadow: `inset -6px -6px 18px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.15)`,
        }}
      >
        <div className="balloon-highlight" />
        <div
          className="balloon-knot"
          style={{ background: color, filter: 'brightness(0.75)' }}
        />
      </div>
      <svg
        style={{ display: 'block', margin: '0 auto' }}
        width="3"
        height="65"
        viewBox="0 0 3 65"
      >
        <path
          d="M1.5 0 Q6 16 1.5 32 Q-3 48 1.5 65"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}

const BALLOON_COLORS = [
  '#FF69B4', '#FF6B6B', '#FFD700', '#9B59B6',
  '#87CEEB', '#4ECDC4', '#FF8E53', '#E8B4FF',
]

export function BalloonField() {
  const balloons = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        x: 5 + (i * 8) + Math.random() * 5,
        delay: i * 0.9,
        size: 42 + Math.random() * 26,
      })),
    [],
  )

  return (
    <>
      {balloons.map((b) => (
        <SingleBalloon
          key={b.id}
          color={b.color}
          x={b.x}
          delay={b.delay}
          size={b.size}
        />
      ))}
    </>
  )
}
