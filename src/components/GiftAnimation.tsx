import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BURST_ITEMS = ['💖', '⭐', '✨', '💫', '🌟', '💜', '💛', '🌸', '🎀', '💝', '🌈', '🦋']

function BurstItem({ emoji, index, total }: { emoji: string; index: number; total: number }) {
  const angle = (index / total) * 360
  const rad = (angle * Math.PI) / 180
  const dist = 90 + (index % 3) * 25

  return (
    <motion.span
      style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        fontSize: '1.3rem',
        pointerEvents: 'none',
        transformOrigin: 'center',
      }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        opacity: [0, 1, 1, 0],
        scale: [0, 1.3, 1, 0.5],
      }}
      transition={{
        duration: 1.8,
        delay: 0.6 + index * 0.07,
        ease: 'easeOut',
      }}
    >
      {emoji}
    </motion.span>
  )
}

export function GiftAnimation() {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'open'>('idle')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('shaking'), 400)
    const t2 = setTimeout(() => setPhase('open'), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{ position: 'relative', width: 130, height: 160, margin: '0 auto 8px' }}>

      {/* Burst items flying out */}
      <AnimatePresence>
        {phase === 'open' &&
          BURST_ITEMS.map((e, i) => (
            <BurstItem key={i} emoji={e} index={i} total={BURST_ITEMS.length} />
          ))}
      </AnimatePresence>

      {/* Box lid */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 110,
          height: 38,
          background: 'linear-gradient(135deg, #c0392b, #e74c3c)',
          borderRadius: '10px 10px 4px 4px',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          originY: 1,
        }}
        animate={
          phase === 'shaking'
            ? { rotate: [-4, 4, -4, 4, 0], x: [-3, 3, -3, 3, 0] }
            : phase === 'open'
            ? { y: -70, rotate: -20, opacity: 0, scale: 0.8 }
            : {}
        }
        transition={
          phase === 'shaking'
            ? { duration: 0.7, ease: 'easeInOut' }
            : { duration: 0.5, ease: 'backIn' }
        }
      >
        {/* Lid ribbon horizontal */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', height: 10,
            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
            borderRadius: 4,
          }} />
          {/* Bow */}
          <div style={{ position: 'absolute', top: -10, display: 'flex', gap: 2 }}>
            <div style={{
              width: 20, height: 14,
              background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
              borderRadius: '50% 0 50% 0',
              transform: 'rotate(-30deg)',
            }} />
            <div style={{
              width: 20, height: 14,
              background: 'linear-gradient(135deg, #FF8C00, #FFD700)',
              borderRadius: '0 50% 0 50%',
              transform: 'rotate(30deg)',
            }} />
          </div>
        </div>
      </motion.div>

      {/* Box body */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100,
          height: 100,
          background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
          borderRadius: '4px 4px 12px 12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={phase === 'open' ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Vertical ribbon */}
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 10,
          background: 'linear-gradient(180deg, #FFD700, #FFA500)',
        }} />
        {/* Inner glow when open */}
        <AnimatePresence>
          {phase === 'open' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>
        {/* Emoji inside when open */}
        <AnimatePresence>
          {phase === 'open' && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
              style={{ fontSize: '2rem', zIndex: 2, position: 'relative' }}
            >
              💖
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Shadow */}
      <div style={{
        position: 'absolute',
        bottom: -8,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 80,
        height: 12,
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '50%',
        filter: 'blur(4px)',
      }} />
    </div>
  )
}
