import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles } from 'lucide-react'

import { StarField } from './components/StarField'
import { BalloonField } from './components/Balloon'
import { QuoteCarousel } from './components/QuoteCarousel'
import { SurpriseModal } from './components/SurpriseModal'
import { MusicPlayer } from './components/MusicPlayer'
import { useConfetti } from './hooks/useConfetti'

// Floating emoji particles in the hero background
const HERO_PARTICLES = ['🌸', '⭐', '💛', '✨', '🌟', '💜', '🎀', '💗']

function FloatingParticle({ emoji, index }: { emoji: string; index: number }) {
  return (
    <motion.span
      aria-hidden="true"
      style={{
        position: 'absolute',
        fontSize: `${1.1 + (index % 3) * 0.4}rem`,
        left: `${8 + index * 11}%`,
        top: `${10 + (index % 4) * 20}%`,
        userSelect: 'none',
        pointerEvents: 'none',
        opacity: 0.45,
      }}
      animate={{
        y: [0, -14, 0],
        rotate: [-8, 8, -8],
        opacity: [0.35, 0.6, 0.35],
      }}
      transition={{
        duration: 3 + index * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.3,
      }}
    >
      {emoji}
    </motion.span>
  )
}

// Animated cake with flickering candles
function CakeSection() {
  return (
    <motion.div
      style={{ textAlign: 'center', margin: '24px 0' }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 2 }}>
        {['🕯️', '🕯️', '🕯️'].map((c, i) => (
          <span key={i} className="candle-flame" style={{ animationDelay: `${i * 0.22}s`, fontSize: '1.6rem' }}>
            {c}
          </span>
        ))}
      </div>
      <div style={{ fontSize: 'clamp(3.5rem, 10vw, 5.5rem)', lineHeight: 1 }}>🎂</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 8 }}>
        {['🎁', '🎊', '🎈', '🎊', '🎁'].map((e, i) => (
          <motion.span
            key={i}
            style={{ fontSize: '1.2rem' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
          >
            {e}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const { launchInitial, launchSurprise } = useConfetti()

  useEffect(() => {
    const timeout = setTimeout(launchInitial, 600)
    return () => clearTimeout(timeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSurprise = () => {
    setShowModal(true)
    launchSurprise()
  }

  return (
    <div className="bg-gradient">
      {/* Layer: star field */}
      <StarField />

      {/* Layer: balloons (fixed, behind content) */}
      <BalloonField />

      {/* Main scrollable content */}
      <main
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px 20px',
        }}
      >
        {/* ── Hero card ── */}
        <motion.article
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: 620,
            padding: 'clamp(28px, 5vw, 48px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background particles inside card */}
          {HERO_PARTICLES.map((e, i) => (
            <FloatingParticle key={i} emoji={e} index={i} />
          ))}

          {/* Top badge */}
          <motion.div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,215,0,0.2)',
              border: '1px solid rgba(255,215,0,0.4)',
              borderRadius: 50,
              padding: '5px 16px',
              marginBottom: 20,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles size={14} color="#FFD700" />
            <span style={{ color: '#FFD700', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em' }}>
              DÍA ESPECIAL
            </span>
            <Sparkles size={14} color="#FFD700" />
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="title-font"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 4.2rem)', marginBottom: 8 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7, type: 'spring', stiffness: 200 }}
          >
            🎉 ¡Feliz Cumpleaños Angela! 🎉
          </motion.h1>

          {/* Subtitle sparkle row */}
          <motion.div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            {['✨', '🌸', '💜', '🌸', '✨'].map((e, i) => (
              <motion.span
                key={i}
                style={{ fontSize: '1.1rem' }}
                animate={{ rotate: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>

          {/* Cake + candles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
          >
            <CakeSection />
          </motion.div>

          {/* Divider */}
          <div className="dots-divider">
            {['#FF69B4', '#FFD700', '#9B59B6', '#87CEEB', '#FF6B6B'].map((c, i) => (
              <div key={i} className="dot" style={{ background: c }} />
            ))}
          </div>

          {/* Message */}
          <motion.p
            className="body-text"
            style={{ fontSize: 'clamp(0.88rem, 2.5vw, 1rem)', marginBottom: 30 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Espero que se la pase bien el día de hoy junto a sus{' '}
            <strong style={{ color: '#FFD700' }}>amigos y familia</strong>. Agradezcale a{' '}
            <strong style={{ color: '#E8B4FF' }}>Dios</strong> por un año más de vida que le da.
            Ha sido una <strong style={{ color: '#FF69B4' }}>gran amiga</strong> a pesar de las
            pendejadas que hago, la aprecio bastante. 🙏✨
          </motion.p>

          {/* Surprise button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              className="btn-surprise"
              onClick={handleSurprise}
              aria-label="Abrir mensaje sorpresa"
            >
              <Gift size={20} />
              Abrir Sorpresa
              <Sparkles size={18} />
            </button>
          </motion.div>
        </motion.article>

        {/* ── Quote carousel ── */}
        <motion.section
          style={{ width: '100%', maxWidth: 620, marginTop: 16 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          aria-label="Frases inspiradoras"
        >
          <QuoteCarousel />
        </motion.section>

        {/* Footer */}
        <motion.footer
          style={{
            marginTop: 20,
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.78rem',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Hecho con 💖 para ti · {new Date().getFullYear()}
        </motion.footer>
      </main>

      {/* ── Music player (fixed) ── */}
      <MusicPlayer />

      {/* ── Surprise modal ── */}
      <AnimatePresence>
        {showModal && <SurpriseModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </div>
  )
}
