import { motion } from 'framer-motion'
import { useState } from 'react'

const Propaganda = () => {
  const [copiedIndex, setCopiedIndex] = useState(null)

  // Mock meme data - in production, this would come from an API or database
  const memes = [
    {
      id: 1,
      type: 'poster',
      title: 'JOIN THE COMMUNITY',
      content: 'Donate any amount. Get airdrops. Burn tokens. Build together.',
      image: null,
      bgColor: 'bg-taxman-green'
    },
    {
      id: 2,
      type: 'quote',
      title: 'The Revolution Will Be Tokenized',
      content: '"When the people donate to the people, the community becomes unstoppable." - The Taxman',
      image: null,
      bgColor: 'bg-taxman-gold'
    },
    {
      id: 3,
      type: 'stat',
      title: 'BY THE NUMBERS',
      content: '$2.8M+ donated by community. 50% airdrops, 50% burns. 100% transparency.',
      image: null,
      bgColor: 'bg-taxman-green'
    },
    {
      id: 4,
      type: 'poster',
      title: 'DAILY AIRDROPS',
      content: 'Your donations fund daily lotteries, NFTs, and status roles.',
      image: null,
      bgColor: 'bg-taxman-charcoal'
    },
    {
      id: 5,
      type: 'quote',
      title: 'Fifty Fifty Split',
      content: '50% to the community. 50% to burns. 100% to the movement.',
      image: null,
      bgColor: 'bg-taxman-black'
    },
    {
      id: 6,
      type: 'poster',
      title: 'STATUS LEVELS',
      content: 'Citizen → Contributor → Supporter → VIP → Legend. Climb the ranks!',
      image: null,
      bgColor: 'bg-taxman-red'
    },
    {
      id: 7,
      type: 'stat',
      title: 'BURN MECHANICS',
      content: '50% burns tokens daily. Fights bots. Deflationary pressure. Chart support.',
      image: null,
      bgColor: 'bg-taxman-gold'
    },
    {
      id: 8,
      type: 'quote',
      title: 'Power to the People',
      content: '"We build together. We burn together. We rise together."',
      image: null,
      bgColor: 'bg-taxman-green'
    },
  ]

  const handleShare = (meme, index) => {
    if (window.playSound) window.playSound('click')
    
    // In a real app, this would share via Web Share API or copy to clipboard
    const shareText = `${meme.title}\n\n${meme.content}\n\n#TAXMAN #ThePeoplesAudit`
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-taxman-black to-taxman-charcoal">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-headline text-taxman-gold mb-6">
              SPREAD THE COMMUNITY
            </h1>
            <p className="text-xl text-taxman-offwhite/70 max-w-3xl mx-auto">
              The community needs voices. Share these messages. Spread the word. 
              Build the revolution together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Memes Grid */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                className={`relative ${meme.bgColor} p-8 border-4 border-taxman-offwhite/20 min-h-[300px] flex flex-col justify-between cursor-pointer group`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, borderColor: '#00ff41' }}
              >
                {/* Type Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-taxman-black/80 px-3 py-1 text-xs font-headline text-taxman-offwhite">
                    {meme.type.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-3xl font-headline text-taxman-offwhite mb-4 leading-tight">
                    {meme.title}
                  </h3>
                  <p className="text-lg text-taxman-offwhite/90 leading-relaxed">
                    {meme.content}
                  </p>
                </div>

                {/* Share Button */}
                <div className="mt-6">
                  <motion.button
                    className="w-full btn-taxman bg-taxman-black/50 text-taxman-offwhite border-taxman-offwhite hover:bg-taxman-offwhite hover:text-taxman-black transition-all"
                    onClick={() => handleShare(meme, index)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copiedIndex === index ? '✓ COPIED!' : 'SHARE'}
                  </motion.button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-taxman-green/0 group-hover:bg-taxman-green/10 transition-all duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

          {/* Load More Section */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block border-2 border-taxman-gold/30 p-8 bg-taxman-charcoal">
              <h3 className="text-3xl font-headline text-taxman-gold mb-4">
                CREATE YOUR OWN
              </h3>
              <p className="text-taxman-offwhite/70 mb-6 max-w-md">
                Have a message for the people? Join our community and contribute to the revolution.
              </p>
              <button 
                className="btn-taxman bg-taxman-green text-taxman-black"
                onClick={() => {
                  if (window.playSound) window.playSound('cash')
                  window.open('https://discord.gg/taxman', '_blank')
                }}
              >
                JOIN DISCORD
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Submissions Section */}
      <section className="relative py-16 px-6 bg-taxman-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-headline text-taxman-gold mb-8 text-center">
              WEAPONIZE YOUR CREATIVITY
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'MEMES',
                  desc: 'Create viral content that spreads the community message',
                  icon: '🎨'
                },
                {
                  title: 'VIDEOS',
                  desc: 'Produce powerful video content for the revolution',
                  icon: '🎬'
                },
                {
                  title: 'POSTERS',
                  desc: 'Design community posters and donation graphics',
                  icon: '📋'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-taxman-black/50 border-2 border-taxman-gold/30 p-6 text-center hover:border-taxman-green transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-headline text-taxman-offwhite mb-3">{item.title}</h3>
                  <p className="text-taxman-offwhite/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-6 bg-taxman-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="border-4 border-taxman-red p-12">
              <h2 className="text-5xl font-headline text-taxman-offwhite mb-6">
                THE COMMUNITY IS OURS
              </h2>
              <p className="text-xl text-taxman-gold mb-8">
                Every share is a vote. Every meme is a weapon. Every donation matters.
              </p>
              <div className="text-6xl font-headline text-taxman-green">
                BUILD TOGETHER
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Propaganda

