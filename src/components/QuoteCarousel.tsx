import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  { text: 'Que cada día de tu vida sea tan brillante como tu sonrisa.', icon: '✨' },
  { text: 'La vida es bella, y hoy más que nunca, porque tú existes.', icon: '🌸' },
  { text: 'Que todos tus sueños se conviertan en realidad este año.', icon: '🌟' },
  { text: 'Tu alegría es un regalo que ilumina a todos a tu alrededor.', icon: '💛' },
  { text: 'Que el amor y la paz sean tus compañeros en cada paso.', icon: '🕊️' },
  { text: 'Mereces todo lo bueno que la vida tiene para ofrecerte.', icon: '🎁' },
  { text: 'Hoy celebramos no solo tu cumpleaños, sino lo maravilloso que eres.', icon: '🎉' },
]

export function QuoteCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const quote = QUOTES[index]

  return (
    <div className="quote-band">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}
        >
          <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: 6 }}>
            {quote.icon}
          </span>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontStyle: 'italic',
              fontSize: '0.97rem',
              lineHeight: 1.65,
            }}
          >
            "{quote.text}"
          </p>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 14 }}>
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ver frase ${i + 1}`}
            style={{
              width: i === index ? 20 : 7,
              height: 7,
              borderRadius: 4,
              border: 'none',
              background: i === index ? '#FFD700' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
