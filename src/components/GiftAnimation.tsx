import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BURST = ['💖', '⭐', '✨', '💫', '🌟', '💜', '💛', '🌸', '🎀', '💝', '🌈', '🦋']

function BurstItem({ emoji, index }: { emoji: string; index: number }) {
  const angle = (index / BURST.length) * 360
  const rad = (angle * Math.PI) / 180
  const dist = 85 + (index % 3) * 20
  return (
    <motion.span
      style={{ position: 'absolute', top: '40%', left: '50%', fontSize: '1.4rem', pointerEvents: 'none' }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.3, 1, 0],
      }}
      transition={{ duration: 1.6, delay: 0.5 + index * 0.06, ease: 'easeOut' }}
    >
      {emoji}
    </motion.span>
  )
}

export function GiftAnimation() {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'open'>('idle')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shaking'), 300)
    const t2 = setTimeout(() => setPhase('open'), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{ position: 'relative', width: 150, height: 180, margin: '0 auto' }}>

      {/* Burst particles */}
      <AnimatePresence>
        {phase === 'open' && BURST.map((e, i) => <BurstItem key={i} emoji={e} index={i} />)}
      </AnimatePresence>

      {/* Lid */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          translateX: '-50%',
          width: 120,
          height: 42,
          background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
          borderRadius: '12px 12px 4px 4px',
          zIndex: 3,
          boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
        }}
        animate={
          phase === 'shaking'
            ? { rotate: [-5, 5, -5, 5, -3, 3, 0], x: ['-50%', 'calc(-50% - 4px)', 'calc(-50% + 4px)', '-50%'] }
            : phase === 'open'
            ? { y: -90, rotate: -25, opacity: 0, scale: 0.75, x: '-50%' }
            : { x: '-50%' }
        }
        transition={
          phase === 'shaking'
            ? { duration: 0.65, ease: 'easeInOut' }
            : phase === 'open'
            ? { duration: 0.45, ease: 'backIn' }
            : {}
        }
      >
        {/* Lid ribbon */}
        <div style={{ width: '100%', height: 11, background: 'linear-gradient(90deg, #f39c12, #FFD700, #f39c12)', borderRadius: 4 }} />
        {/* Bow left */}
        <div style={{
          position: 'absolute', top: -16, left: '50%', marginLeft: -22,
          width: 20, height: 16,
          background: 'linear-gradient(135deg, #FFD700, #e67e22)',
          borderRadius: '50% 0 50% 0',
          transform: 'rotate(-25deg)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }} />
        {/* Bow right */}
        <div style={{
          position: 'absolute', top: -16, left: '50%', marginLeft: 2,
          width: 20, height: 16,
          background: 'linear-gradient(135deg, #e67e22, #FFD700)',
          borderRadius: '0 50% 0 50%',
          transform: 'rotate(25deg)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        }} />
        {/* Bow center knot */}
        <div style={{
          position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
          width: 12, height: 12,
          background: '#FFD700',
          borderRadius: '50%',
          boxShadow: '0 0 8px rgba(255,215,0,0.8)',
          zIndex: 1,
        }} />
      </motion.div>

      {/* Box body */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 110,
          height: 110,
          background: 'linear-gradient(145deg, #e74c3c, #c0392b)',
          borderRadius: '4px 4px 14px 14px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={phase === 'open' ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Vertical ribbon stripe */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: 12,
          background: 'linear-gradient(180deg, #f39c12, #FFD700, #f39c12)',
        }} />
        {/* Inner glow on open */}
        <AnimatePresence>
          {phase === 'open' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(255,215,0,0.55) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>
        {/* Heart inside */}
        <AnimatePresence>
          {phase === 'open' && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.5, ease: 'backOut' }}
              style={{ fontSize: '2.4rem', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 8px rgba(255,100,150,0.9))' }}
            >
              💖
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ground shadow */}
      <div style={{
        position: 'absolute', bottom: 2, left: '50%',
        width: 90, height: 14,
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.22)',
        borderRadius: '50%',
        filter: 'blur(5px)',
      }} />
    </div>
  )
}
