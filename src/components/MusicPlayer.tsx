import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

// Happy Birthday melody: [frequency Hz, duration seconds]
const MELODY: [number, number][] = [
  [261.63, 0.35], [261.63, 0.15], [293.66, 0.5], [261.63, 0.5],
  [349.23, 0.5], [329.63, 1.0],
  [261.63, 0.35], [261.63, 0.15], [293.66, 0.5], [261.63, 0.5],
  [392.00, 0.5], [349.23, 1.0],
  [261.63, 0.35], [261.63, 0.15], [523.25, 0.5], [440.00, 0.5],
  [349.23, 0.5], [329.63, 0.5], [293.66, 1.0],
  [466.16, 0.35], [466.16, 0.15], [440.00, 0.5], [349.23, 0.5],
  [392.00, 0.5], [349.23, 1.2],
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const stopRef = useRef(false)

  const playMelody = useCallback((ctx: AudioContext) => {
    stopRef.current = false
    let t = ctx.currentTime + 0.1

    MELODY.forEach(([freq, dur]) => {
      if (stopRef.current) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.22, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur - 0.04)
      osc.start(t)
      osc.stop(t + dur)
      t += dur
    })

    // Loop
    const loopDelay = (t - ctx.currentTime + 0.5) * 1000
    const timer = setTimeout(() => {
      if (!stopRef.current) playMelody(ctx)
    }, loopDelay)

    return timer
  }, [])

  const toggle = () => {
    if (isPlaying) {
      stopRef.current = true
      ctxRef.current?.close()
      ctxRef.current = null
      setIsPlaying(false)
    } else {
      const ctx = new AudioContext()
      ctxRef.current = ctx
      playMelody(ctx)
      setIsPlaying(true)
    }
  }

  return (
    <motion.button
      className="btn-music"
      onClick={toggle}
      aria-label={isPlaying ? 'Silenciar música' : 'Reproducir música'}
      title={isPlaying ? 'Silenciar música' : '🎵 Reproducir Cumpleaños Feliz'}
      whileTap={{ scale: 0.88 }}
    >
      <motion.span
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
        style={{ display: 'inline-block' }}
      >
        {isPlaying ? '🎵' : '🔇'}
      </motion.span>
    </motion.button>
  )
}
