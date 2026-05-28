import confetti from 'canvas-confetti'

const COLORS = ['#FF69B4', '#9B59B6', '#FFD700', '#87CEEB', '#FF6B6B', '#4ECDC4', '#ffffff', '#E8B4FF']

export function useConfetti() {
  const launchInitial = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.55 },
      colors: COLORS,
      scalar: 1.1,
    })
  }

  const launchSurprise = () => {
    const end = Date.now() + 2800

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
        colors: COLORS,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
        colors: COLORS,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }

  const launchStar = (x: number, y: number) => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: COLORS,
      shapes: ['star'],
      scalar: 1.3,
    })
  }

  return { launchInitial, launchSurprise, launchStar }
}
