import { motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'

interface SurpriseModalProps {
  onClose: () => void
}

const DECORATIONS = ['💜', '💛', '💗', '⭐', '🌸', '💫']

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
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <button className="btn-close" onClick={onClose} aria-label="Cerrar">
          <X size={16} />
        </button>

        {/* Floating decorations */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          {DECORATIONS.map((d, i) => (
            <motion.span
              key={i}
              style={{ fontSize: '1.4rem' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            >
              {d}
            </motion.span>
          ))}
        </div>

        <motion.h2
          id="modal-title"
          className="title-font"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', marginBottom: 16 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          🎁 Para Angela 💜
        </motion.h2>

        <div className="dots-divider">
          {[0,1,2,3,4].map(i => <div key={i} className="dot" style={{ background: ['#FF69B4','#FFD700','#9B59B6','#87CEEB','#FF6B6B'][i] }} />)}
        </div>

        <p className="body-text" style={{ fontSize: '1rem', marginBottom: 20 }}>
          Espero que <strong style={{ color: '#FFD700' }}>Dios</strong> te siga dando más años de vida
          y que todas las <strong style={{ color: '#E8B4FF' }}>metas</strong> que te has propuesto
          las puedas cumplir con su ayuda. 🙏
        </p>

        <p
          className="body-text"
          style={{ fontSize: '0.95rem', marginBottom: 12 }}
        >
          Y nada... <strong style={{ color: '#FF69B4' }}>¡Feliz Cumpleaños nuevamente!</strong> 🎉
        </p>

        <p
          className="body-text"
          style={{ fontSize: '0.9rem', opacity: 0.8, fontStyle: 'italic', marginBottom: 28 }}
        >
          ¡Disfrute su día que es una vez al año! 😄🎂
        </p>

        <motion.div
          style={{ display: 'flex', justifyContent: 'center', gap: 12 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          {[0,1,2].map(i => (
            <Heart key={i} size={22} fill="#FF69B4" color="#FF69B4" style={{ filter: 'drop-shadow(0 0 6px #FF69B4)' }} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
