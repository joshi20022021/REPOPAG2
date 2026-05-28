import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { GiftAnimation } from './GiftAnimation'

interface SurpriseModalProps {
  onClose: () => void
}

const ROW1 = ['💖', '💜', '💛', '💗', '💝']
const ROW2 = ['✨', '🌟', '⭐', '🌟', '✨']

function FloatingRow({ items, delay = 0 }: { items: string[]; delay?: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 14, margin: '6px 0' }}>
      {items.map((e, i) => (
        <motion.span
          key={i}
          style={{ fontSize: '1.5rem', display: 'inline-block' }}
          animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: delay + i * 0.15,
          }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  )
}

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
        style={{ maxWidth: 380, textAlign: 'center' }}
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <button className="btn-close" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>

        {/* Top emoji row */}
        <FloatingRow items={ROW2} delay={0} />

        {/* Animated gift box */}
        <div style={{ margin: '8px 0' }}>
          <GiftAnimation />
        </div>

        {/* Title */}
        <motion.h2
          id="modal-title"
          className="title-font"
          style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', margin: '8px 0 14px' }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ¡Para Angela! 🎀
        </motion.h2>

        {/* Heart row */}
        <FloatingRow items={ROW1} delay={0.2} />

        {/* Sign-off */}
        <motion.p
          style={{
            color: 'rgba(255,255,255,0.88)',
            fontStyle: 'italic',
            fontSize: '1rem',
            marginTop: 16,
            letterSpacing: '0.04em',
          }}
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          con mucho cariño 💖
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
