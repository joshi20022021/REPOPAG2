import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GiftAnimation } from './GiftAnimation'

interface SurpriseModalProps {
  onClose: () => void
}

const HEARTS = ['💖', '💜', '💛', '💗', '🤍', '💝']

export function SurpriseModal({ onClose }: SurpriseModalProps) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        className="modal-card"
        style={{ maxWidth: 400 }}
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <button className="btn-close" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>

        {/* Animated gift box */}
        <GiftAnimation />

        {/* Title */}
        <motion.h2
          id="modal-title"
          className="title-font"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', marginTop: 10, marginBottom: 18 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎉 ¡Para Angela! 🎉
        </motion.h2>

        {/* Orbiting hearts */}
        <div style={{ position: 'relative', height: 80, marginBottom: 16 }}>
          {HEARTS.map((h, i) => {
            const angle = (i / HEARTS.length) * 360
            const rad = (angle * Math.PI) / 180
            const rx = 52, ry = 28
            return (
              <motion.span
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  fontSize: '1.5rem',
                  marginLeft: -12,
                  marginTop: -12,
                }}
                animate={{
                  x: Math.cos(rad + (i * 0.5)) * rx,
                  y: Math.sin(rad + (i * 0.5)) * ry,
                  rotate: [0, 360],
                }}
                transition={{
                  x: { duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.15 },
                  y: { duration: 4, repeat: Infinity, ease: 'linear', delay: i * 0.15 },
                  rotate: { duration: 3 + i * 0.2, repeat: Infinity, ease: 'linear' },
                }}
              >
                {h}
              </motion.span>
            )
          })}

          {/* Center sparkle */}
          <motion.span
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '2rem',
            }}
            animate={{ scale: [1, 1.3, 1], rotate: [0, 20, -20, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨
          </motion.span>
        </div>

        {/* Short unique sign-off */}
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontStyle: 'italic',
            fontSize: '1rem',
            letterSpacing: '0.03em',
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          con mucho cariño 💖
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
