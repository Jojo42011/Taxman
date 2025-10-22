import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TaxmanMascot from '../components/TaxmanMascot'
import { useRef } from 'react'

const Landing = () => {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  const handleBeginAudit = () => {
    if (window.playSound) window.playSound('cash')
    setTimeout(() => navigate('/dashboard'), 300)
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-taxman-black via-taxman-charcoal to-taxman-black">
          {/* Desk video simulation with CSS */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=')] opacity-50"></div>
          
          {/* Digital Grid Overlay */}
          <motion.div 
            className="absolute inset-0 grid-bg"
            style={{ opacity: gridOpacity }}
          />
          
          {/* Floating financial data */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-taxman-gold/20 font-mono text-xs"
                initial={{ 
                  y: '100vh', 
                  x: Math.random() * window.innerWidth,
                  opacity: 0.5
                }}
                animate={{ 
                  y: '-10vh',
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear'
                }}
              >
                ${(Math.random() * 1000000).toFixed(2)}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative z-10 text-center px-6"
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-8xl md:text-9xl font-headline text-taxman-offwhite mb-6 text-glow">
              The Tax-Man
            </h1>
          </motion.div>

          <motion.p
            className="text-2xl md:text-3xl font-headline text-taxman-gold mb-12 max-w-3xl mx-auto tracking-wider"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Help Taxman by hunting the bots and earning rewards
          </motion.p>

          <motion.button
            className="btn-taxman bg-taxman-green text-taxman-black hover:bg-taxman-green/90 relative z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBeginAudit}
          >
            START HUNTING
          </motion.button>
        </motion.div>

        {/* Taxman Hero Image */}
        <motion.div
          className="absolute right-10 md:right-20 bottom-10 w-72 h-96 md:w-80 md:h-[28rem]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="relative w-full h-full">
            <img 
              src="/taxman-hero.jpg" 
              alt="The Taxman - A mysterious figure in a business suit with a money bag for a head"
              className="w-full h-full object-cover rounded-lg shadow-2xl border-4 border-taxman-gold/30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-taxman-black/30 to-transparent rounded-lg"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-taxman-gold text-sm font-headline text-center">
                THE TAXMAN AWAITS
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-taxman-gold text-sm font-headline">SCROLL TO LEARN MORE</div>
          <div className="w-6 h-10 border-2 border-taxman-gold rounded-full mx-auto mt-2 relative">
            <motion.div
              className="w-1.5 h-1.5 bg-taxman-gold rounded-full absolute left-1/2 -translate-x-1/2 top-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 px-6 bg-taxman-charcoal">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-headline text-taxman-gold mb-12 text-center">
              THE GAME IS LIVE
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'ZERO ENTRY FEE',
                  desc: 'Join the hunt for free. All skill levels welcome!',
                  icon: ''
                },
                {
                  title: 'BOT HUNTING',
                  desc: 'Find bots, earn points, get rewards.',
                  icon: ''
                },
                {
                  title: 'MEME REWARDS',
                  desc: 'Top hunters get exclusive memes and prizes.',
                  icon: ''
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-taxman-black/50 border-2 border-taxman-gold/30 p-8 text-center hover:border-taxman-green transition-colors duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-headline text-taxman-offwhite mb-4">{item.title}</h3>
                  <p className="text-taxman-offwhite/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 px-6 bg-taxman-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-headline text-taxman-offwhite mb-8">
              JOIN THE HUNT
            </h2>
            <p className="text-xl text-taxman-gold mb-12">
              The bots are running wild. Time to hunt them down and earn some memes! 🎮
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="btn-taxman bg-taxman-green text-taxman-black hover:bg-taxman-green/90"
                onClick={() => {
                  if (window.playSound) window.playSound('cash')
                  navigate('/dashboard')
                }}
              >
                START HUNTING
              </button>
              <button
                className="btn-taxman text-taxman-gold border-taxman-gold hover:bg-taxman-gold/10"
                onClick={() => {
                  if (window.playSound) window.playSound('click')
                  navigate('/manifesto')
                }}
              >
                GAME RULES
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing

