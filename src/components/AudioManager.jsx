import { useEffect } from 'react'

const AudioManager = () => {
  useEffect(() => {
    // Create AudioContext for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Store in window for global access
    window.playSound = (type) => {
      if (!audioContext) return
      
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      switch(type) {
        case 'click':
          oscillator.frequency.value = 800
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
          break
        case 'cash':
          oscillator.frequency.value = 1200
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
          break
        case 'stamp':
          oscillator.type = 'square'
          oscillator.frequency.value = 150
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
          break
        case 'error':
          oscillator.frequency.value = 200
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)
          break
      }
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
    
    return () => {
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])
  
  return null
}

export default AudioManager

