import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Manifesto = () => {
  const [stampedClauses, setStampedClauses] = useState({})
  const [hoveredClause, setHoveredClause] = useState(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const clauses = [
    {
      id: 1,
      title: 'RULE 1: THE DONATIONS',
      content: 'Anyone can donate any amount to the community wallet. Zero barriers. Maximum transparency.',
      details: [
        'Donate any amount - no minimum required',
        'All donations tracked on blockchain',
        'Real-time pool updates and transparency',
        'Community wallet address publicly visible'
      ]
    },
    {
      id: 2,
      title: 'RULE 2: THE 50/50 SPLIT',
      content: '50% goes to lotteries, NFTs, and exclusive rewards. 50% burns tokens, fights bots, and supports the floor.',
      details: [
        '50% to rewards pool: lotteries, NFTs, status roles & exclusive access',
        'Daily token lotteries, NFT drops, and tier-based airdrops',
        '50% to burn pool: token deflation & strategic buybacks',
        'Fights bots, supports chart floor, and maintains value'
      ]
    },
    {
      id: 3,
      title: 'RULE 3: THE REWARDS',
      content: 'Higher donations = higher status = better airdrop chances. The community builds together!',
      details: [
        'Status levels: TaxAgent → Field Agent → Special Agent → Chief Agent',
        'Airdrop lottery odds: 1x → 2x → 5x → 10x',
        'Shilling bonuses: 10% → 20% → 30% → 50%',
        'Exclusive Discord roles, raids, and early access'
      ]
    }
  ]

  const handleClauseClick = (clauseId) => {
    if (window.playSound) window.playSound('stamp')
    setStampedClauses(prev => ({
      ...prev,
      [clauseId]: true
    }))
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-taxman-black to-taxman-charcoal">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl font-headline text-taxman-gold mb-6">
              THE COMMUNITY MODEL
            </h1>
            <p className="text-xl text-taxman-offwhite/80 max-w-3xl mx-auto">
              How donations work, airdrops are distributed, and tokens are burned. Build together! 💰
            </p>
          </motion.div>
        </div>
      </section>

      {/* Clauses */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {clauses.map((clause, index) => (
            <motion.div
              key={clause.id}
              className="relative"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div
                className="relative bg-taxman-offwhite/5 border-2 border-taxman-gold/30 p-8 md:p-12 cursor-pointer transition-all duration-300 hover:border-taxman-green hover:bg-taxman-offwhite/10"
                onMouseEnter={() => setHoveredClause(clause.id)}
                onMouseLeave={() => setHoveredClause(null)}
                onClick={() => handleClauseClick(clause.id)}
              >
                {/* Parchment texture overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXRjaGVybiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSIjZmZmIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdGNoZXJuKSIvPjwvc3ZnPg==')]"></div>
                
                {/* Glitch effect */}
                <motion.div
                  className="absolute inset-0 bg-taxman-green/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredClause === clause.id ? [0, 0.3, 0] : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-headline text-taxman-gold mb-6">
                    {clause.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-taxman-offwhite mb-8 leading-relaxed">
                    {clause.content}
                  </p>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    {clause.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="text-taxman-green text-xl">▸</div>
                        <p className="text-taxman-offwhite/70">{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Approved Stamp */}
                {stampedClauses[clause.id] && (
                  <motion.div
                    className="absolute top-8 right-8 transform rotate-12"
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 12 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <div className="relative">
                      <div className="text-8xl font-headline text-taxman-green opacity-80 border-8 border-taxman-green px-8 py-4 transform -rotate-12">
                        LOCKED IN! 🔒
                      </div>
                      <div className="absolute inset-0 bg-taxman-green/10 blur-xl"></div>
                    </div>
                  </motion.div>
                )}

                {/* Hovering Taxman */}
                {hoveredClause === clause.id && !stampedClauses[clause.id] && (
                  <motion.div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                  >
                    <div className="text-center mt-2 text-sm text-taxman-green font-headline">
                      CLICK TO APPROVE
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final Statement */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-taxman-charcoal to-taxman-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="border-4 border-taxman-gold p-12 bg-taxman-black/50">
              <h2 className="text-5xl font-headline text-taxman-offwhite mb-6">
                LET'S BUILD THE COMMUNITY! 💰
              </h2>
              <p className="text-xl text-taxman-gold mb-8">
                This is not just donations. This is a movement. This is community-driven! 🚀
              </p>
              <div className="flex justify-center mb-6">
                <img 
                  src="/taxman-hero-fighting-bots.jpg" 
                  alt="The Taxman fighting bots in cyberpunk city"
                  className="w-full max-w-md h-auto rounded-lg shadow-2xl border-4 border-taxman-gold/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Manifesto

