import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import TaxmanMascot from '../components/TaxmanMascot'

const Dashboard = () => {
  const [totalLiberated, setTotalLiberated] = useState(1247893)
  const [botsAudited, setBotsAudited] = useState(342)
  const [nextRedistribution, setNextRedistribution] = useState(3600)
  const [auditScore, setAuditScore] = useState(0)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, address: '0x742d...a3f1', score: 1520 },
    { rank: 2, address: '0x8c91...7b2e', score: 1340 },
    { rank: 3, address: '0x3f5a...c9d4', score: 1180 },
    { rank: 4, address: '0x6d8e...1a7f', score: 980 },
    { rank: 5, address: '0x9b2c...4e8a', score: 850 },
  ])

  // Mock chart data
  const chartData = [
    { time: '00:00', price: 0.000045 },
    { time: '04:00', price: 0.000052 },
    { time: '08:00', price: 0.000048 },
    { time: '12:00', price: 0.000061 },
    { time: '16:00', price: 0.000075 },
    { time: '20:00', price: 0.000068 },
    { time: '24:00', price: 0.000082 },
  ]

  // Mock wallet data for audit game
  const walletPool = [
    { 
      address: '0xa1b2...c3d4', 
      isBot: true, 
      transactions: 847, 
      avgHoldTime: '2m',
      pattern: 'Rapid buy/sell cycles detected'
    },
    { 
      address: '0xe5f6...g7h8', 
      isBot: false, 
      transactions: 23, 
      avgHoldTime: '14d',
      pattern: 'Normal trading behavior'
    },
    { 
      address: '0xij9k...l0mn', 
      isBot: true, 
      transactions: 1203, 
      avgHoldTime: '45s',
      pattern: 'MEV bot signature detected'
    },
    { 
      address: '0xop1q...r2st', 
      isBot: false, 
      transactions: 8, 
      avgHoldTime: '28d',
      pattern: 'Long-term holder'
    },
  ]

  // Most wanted wallets (bots with highest tax collected)
  const mostWanted = [
    { address: '0x7f3e...9a2b', taxCollected: 42150 },
    { address: '0x4c8d...1e5f', taxCollected: 38920 },
    { address: '0x9b1a...6c7d', taxCollected: 31740 },
    { address: '0x2e5f...8g3h', taxCollected: 27580 },
  ]

  useEffect(() => {
    // Animate counters
    const interval = setInterval(() => {
      setTotalLiberated(prev => prev + Math.floor(Math.random() * 100))
      if (Math.random() > 0.7) {
        setBotsAudited(prev => prev + 1)
      }
    }, 3000)

    // Countdown timer
    const timer = setInterval(() => {
      setNextRedistribution(prev => prev > 0 ? prev - 1 : 3600)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(timer)
    }
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h}h ${m}m ${s}s`
  }

  const getRandomWallet = () => {
    const randomIndex = Math.floor(Math.random() * walletPool.length)
    setSelectedWallet(walletPool[randomIndex])
  }

  const handleAudit = (verdict) => {
    if (!selectedWallet) return
    
    const isCorrect = (verdict === 'bot' && selectedWallet.isBot) || 
                     (verdict === 'clear' && !selectedWallet.isBot)
    
    if (isCorrect) {
      if (window.playSound) window.playSound('cash')
      setAuditScore(prev => prev + 10)
    } else {
      if (window.playSound) window.playSound('error')
      setAuditScore(prev => Math.max(0, prev - 5))
    }
    
    setTimeout(() => {
      setSelectedWallet(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-12 px-6 bg-gradient-to-b from-taxman-black to-taxman-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-headline text-taxman-gold mb-4 text-center">
              BOT HUNTER HQ 🎯
            </h1>
            <p className="text-center text-taxman-offwhite/70 text-lg">
              Real-time bot hunting with meme rewards! Let's catch some bots! 🎮
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">BOTS HUNTED TODAY</div>
              <div className="text-4xl font-headline text-taxman-green">
                {botsAudited} 🎯
              </div>
            </motion.div>

            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">YOUR HUNT STREAK</div>
              <div className="text-4xl font-headline text-taxman-green">
                7 🔥
              </div>
            </motion.div>

            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">MEMES EARNED</div>
              <div className="text-4xl font-headline text-taxman-red">
                23 🏆
              </div>
            </motion.div>
          </div>

          {/* Chart and Most Wanted */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Price Chart */}
            <div className="lg:col-span-2 bg-taxman-charcoal border-2 border-taxman-gold/30 p-6 relative">
              <h2 className="text-2xl font-headline text-taxman-gold mb-4">$TAXMAN PRICE ACTION</h2>
              
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-taxman-black/80 flex items-center justify-center z-10 rounded-lg">
                <div className="text-center">
                  <div className="text-6xl font-headline text-taxman-gold mb-4 animate-pulse">
                    COMING SOON
                  </div>
                  <div className="text-xl text-taxman-offwhite mb-2">
                    Live Price Data
                  </div>
                  <div className="text-sm text-taxman-gold/70">
                    Real-time charts powered by DEX APIs
                  </div>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="time" stroke="#b8860b" />
                  <YAxis stroke="#b8860b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '2px solid #b8860b',
                      color: '#f5f5dc'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#00ff41" 
                    strokeWidth={3}
                    dot={{ fill: '#00ff41', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Most Wanted */}
            <div className="bg-taxman-charcoal border-2 border-taxman-red/50 p-6">
              <h2 className="text-2xl font-headline text-taxman-red mb-4">BOT HALL OF SHAME 😈</h2>
              <div className="space-y-3">
                {mostWanted.map((wallet, i) => (
                  <motion.div
                    key={i}
                    className="bg-taxman-black/50 p-3 border-l-4 border-taxman-red"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="font-mono text-sm text-taxman-offwhite">{wallet.address}</div>
                    <div className="text-taxman-red font-headline">
                      {wallet.taxCollected.toLocaleString()} POINTS EARNED
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Game */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Game Panel */}
            <div className="lg:col-span-2 bg-taxman-charcoal border-2 border-taxman-green/30 p-8">
              <h2 className="text-3xl font-headline text-taxman-green mb-4">BOT HUNTER GAME 🎮</h2>
              <p className="text-taxman-offwhite/70 mb-6">
                Hunt down suspicious bots! Earn points, unlock memes, and become a legendary hunter! 🎯
              </p>

              <div className="bg-taxman-black/50 p-6 mb-6 min-h-[200px]">
                {!selectedWallet ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <TaxmanMascot expression="determined" size="small" />
                    <button
                      className="btn-taxman bg-taxman-green text-taxman-black mt-6"
                      onClick={() => {
                        if (window.playSound) window.playSound('click')
                        getRandomWallet()
                      }}
                    >
                      START HUNTING
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="mb-4">
                      <div className="text-sm text-taxman-gold/70 mb-1">WALLET ADDRESS</div>
                      <div className="text-2xl font-mono text-taxman-offwhite">{selectedWallet.address}</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-taxman-gold/70">TRANSACTIONS</div>
                        <div className="text-xl font-headline text-taxman-offwhite">
                          {selectedWallet.transactions}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-taxman-gold/70">AVG HOLD TIME</div>
                        <div className="text-xl font-headline text-taxman-offwhite">
                          {selectedWallet.avgHoldTime}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-taxman-gold/70">PATTERN</div>
                        <div className="text-sm text-taxman-offwhite">
                          {selectedWallet.pattern}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        className="btn-taxman bg-taxman-red text-taxman-offwhite flex-1"
                        onClick={() => handleAudit('bot')}
                      >
                        HUNT BOT! 🎯
                      </button>
                      <button
                        className="btn-taxman bg-taxman-green text-taxman-black flex-1"
                        onClick={() => handleAudit('clear')}
                      >
                        CLEAR ✅
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="text-center">
                <div className="text-sm text-taxman-gold/70 mb-1">YOUR HUNT SCORE</div>
                <div className="text-4xl font-headline text-taxman-green">{auditScore} 🏆</div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6">
              <h2 className="text-2xl font-headline text-taxman-gold mb-4">TOP HUNTERS 🏆</h2>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <motion.div
                    key={entry.rank}
                    className={`p-3 border-l-4 ${
                      entry.rank === 1 ? 'bg-taxman-gold/10 border-taxman-gold' :
                      entry.rank === 2 ? 'bg-taxman-offwhite/5 border-taxman-offwhite' :
                      entry.rank === 3 ? 'bg-taxman-gold/5 border-taxman-gold/50' :
                      'bg-taxman-black/50 border-taxman-green/30'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: entry.rank * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-headline text-2xl text-taxman-gold mr-2">
                          #{entry.rank}
                        </span>
                        <span className="font-mono text-sm text-taxman-offwhite">
                          {entry.address}
                        </span>
                      </div>
                      <div className="text-taxman-green font-headline text-xl">
                        {entry.score}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

