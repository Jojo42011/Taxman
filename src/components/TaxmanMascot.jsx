import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const TaxmanMascot = ({ expression = 'determined', size = 'medium', className = '' }) => {
  const expressions = {
    determined: '>-|',
    happy: ':)',
    loading: '•_•',
    cool: '⌐■_■',
    angry: '>:(',
  }

  const sizes = {
    small: 'w-32 h-40',
    medium: 'w-48 h-60',
    large: 'w-64 h-80',
    xlarge: 'w-80 h-96'
  }

  return (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Body - Suit */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3/5 bg-taxman-charcoal rounded-sm border-2 border-taxman-offwhite/20">
        {/* Tie */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-taxman-gold/80"></div>
        {/* Buttons */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-2 h-2 bg-taxman-gold rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-taxman-gold rounded-full"></div>
      </div>

      {/* Money Bag Head */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2/3"
        animate={{ rotate: [0, -2, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Bag */}
        <div className="relative w-full h-full">
          {/* Main bag */}
          <div className="absolute bottom-0 w-full h-4/5 bg-taxman-offwhite rounded-b-3xl border-4 border-taxman-gold/30">
            {/* Dollar sign */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-6xl font-headline text-taxman-gold opacity-30">
              $
            </div>
          </div>
          
          {/* Bag tie/neck */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1/2 h-1/6 bg-taxman-gold/60 rounded-sm"></div>
          
          {/* Pixelated face display */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 bg-taxman-black/80 px-6 py-3 rounded border-2 border-taxman-green/50"
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-2xl font-mono text-taxman-green tracking-wider pixel-text">
              {expressions[expression]}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Arms */}
      <div className="absolute bottom-1/3 left-0 w-1/4 h-1/6 bg-taxman-charcoal rounded-l-full border-2 border-taxman-offwhite/20"></div>
      <div className="absolute bottom-1/3 right-0 w-1/4 h-1/6 bg-taxman-charcoal rounded-r-full border-2 border-taxman-offwhite/20"></div>
    </motion.div>
  )
}

export default TaxmanMascot

