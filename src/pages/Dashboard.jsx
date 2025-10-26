import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const navigate = useNavigate()
  const [totalDonated, setTotalDonated] = useState(2847392)
  const [airdropPool, setAirdropPool] = useState(1423696)
  const [burnPool, setBurnPool] = useState(1423696)
  const [nextAirdrop, setNextAirdrop] = useState(3600)
  const [donationAmount, setDonationAmount] = useState('')
  
  // Hall of Fame Donators
  const hallOfFame = [
    { rank: 1, address: 'Tgx1P...a3f1', donated: 25.5, status: 'BagLords' },
    { rank: 2, address: 'Tgx8c...7b2e', donated: 18.2, status: 'BagLords' },
    { rank: 3, address: 'Tgx3f...c9d4', donated: 12.8, status: 'BagPrinces' },
    { rank: 4, address: 'Tgx6d...1a7f', donated: 8.5, status: 'BagPrinces' },
    { rank: 5, address: 'Tgx9b...4e8a', donated: 5.2, status: 'BagKnights' },
    { rank: 6, address: 'Tgxa7...k3m9', donated: 3.1, status: 'BagKnights' },
    { rank: 7, address: 'Tgx5d...n8q3', donated: 1.8, status: 'BagPrinces' },
    { rank: 8, address: 'Tgx9f...p2w1', donated: 0.05, status: 'BagSquire' },
  ]
  
  // Today's Lottery Winner
  const todaysWinner = {
    address: 'Tgx7h...k9m3',
    prize: '500 SOL',
    prizeType: 'Token Airdrop',
    time: '2h 35m ago'
  }

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

  // Upcoming airdrops
  const upcomingAirdrops = [
    { type: 'Token Airdrop', pool: 500000, time: '2h 15m' },
    { type: 'NFT Drop', pool: 200000, time: '6h 30m' },
    { type: 'Status Role', pool: 100000, time: '12h 45m' },
  ]

  useEffect(() => {
    // Animate counters
    const interval = setInterval(() => {
      setTotalDonated(prev => prev + Math.floor(Math.random() * 100))
      setAirdropPool(prev => prev + Math.floor(Math.random() * 50))
      setBurnPool(prev => prev + Math.floor(Math.random() * 50))
    }, 3000)

    // Countdown timer
    const timer = setInterval(() => {
      setNextAirdrop(prev => prev > 0 ? prev - 1 : 3600)
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

  const handleDonation = () => {
    if (!donationAmount || donationAmount <= 0) return
    
    if (window.playSound) window.playSound('cash')
    
    const amount = parseFloat(donationAmount)
    setTotalDonated(prev => prev + amount)
    setAirdropPool(prev => prev + (amount * 0.5))
    setBurnPool(prev => prev + (amount * 0.5))
    
    setDonationAmount('')
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
              COMMUNITY HUB
            </h1>
            <p className="text-center text-taxman-offwhite/70 text-lg mb-8">
              Donate. Get airdrops. Burn tokens. Build together.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="btn-taxman bg-taxman-gold text-taxman-black hover:bg-taxman-gold/90"
                onClick={() => {
                  if (window.playSound) window.playSound('click')
                  navigate('/rewards')
                }}
              >
                VIEW REWARDS & TIERS
              </button>
              <button
                className="btn-taxman text-taxman-green border-taxman-green hover:bg-taxman-green/10"
                onClick={() => {
                  if (window.playSound) window.playSound('click')
                  navigate('/manifesto')
                }}
              >
                HOW IT WORKS
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">AIRDROP PRIZE POOL</div>
              <div className="text-4xl font-headline text-taxman-green mb-2">
                ${airdropPool.toLocaleString()}
              </div>
              <div className="text-xs text-taxman-offwhite/50">
                Today's draw: ${Math.floor(airdropPool * 0.1).toLocaleString()} • 10% daily payout • Weighted odds by tier
              </div>
            </motion.div>

            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">NEXT LOTTERY DRAW</div>
              <div className="text-4xl font-headline text-taxman-green">
                {formatTime(nextAirdrop)}
              </div>
              <div className="text-xs text-taxman-offwhite/50 mt-2">
                All tiers compete • Weighted by status
              </div>
            </motion.div>
          </div>

          {/* Today's Lottery Winner */}
          <motion.div
            className="bg-taxman-charcoal border-2 border-taxman-gold/50 p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="text-6xl">🏆</div>
            </div>
            <h2 className="text-2xl font-headline text-taxman-gold mb-4 text-center">
              TODAY'S LOTTERY WINNER
            </h2>
            <div className="bg-taxman-black/50 border-2 border-taxman-green/50 p-6 text-center max-w-md mx-auto">
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">WINNER</div>
              <div className="font-mono text-lg text-taxman-offwhite mb-3">{todaysWinner.address}</div>
              <div className="text-3xl font-headline text-taxman-green mb-3">
                {todaysWinner.prize}
              </div>
              <div className="text-taxman-gold font-headline text-sm mb-1">{todaysWinner.prizeType}</div>
              <div className="text-taxman-offwhite/50 text-xs">{todaysWinner.time}</div>
            </div>
          </motion.div>

          {/* Chart and Most Wanted */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Price Chart */}
            <div className="lg:col-span-2 bg-taxman-charcoal border-2 border-taxman-gold/30 p-6">
              <h2 className="text-2xl font-headline text-taxman-gold mb-4">$TAXMAN PRICE ACTION</h2>
              <div className="flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <div className="text-4xl font-headline text-taxman-gold mb-2">
                    COMING SOON
                  </div>
                  <div className="text-taxman-offwhite/50">
                    Live price chart will be available after launch
                  </div>
                </div>
              </div>
            </div>

            {/* Hall of Fame Donators */}
            <div className="bg-taxman-charcoal border-2 border-taxman-gold/50 p-6">
              <div className="flex items-center justify-center mb-2">
                <div className="text-4xl">⭐</div>
              </div>
              <h2 className="text-2xl font-headline text-taxman-gold mb-4 text-center">
                HALL OF FAME DONATORS
              </h2>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {hallOfFame.map((donator, i) => (
                  <motion.div
                    key={i}
                    className="bg-taxman-black/50 border-l-4 border-taxman-gold p-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-taxman-gold font-headline text-sm">
                          #{donator.rank}
                        </div>
                        <div>
                          <div className="font-mono text-sm text-taxman-offwhite">{donator.address}</div>
                          <div className="text-xs text-taxman-gold/70">{donator.status}</div>
                        </div>
                      </div>
                      <div className="text-taxman-green font-headline">
                        {donator.donated} SOL
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Donation Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Donation Panel */}
            <div className="lg:col-span-2 bg-taxman-charcoal border-2 border-taxman-green/30 p-8">
              <h2 className="text-3xl font-headline text-taxman-green mb-4">DONATE TO THE TREASURY</h2>
              <p className="text-taxman-offwhite/70 mb-6">
                Send any amount to our treasury wallet. 50% goes to lotteries, NFTs, and rewards. 50% to burns and bot fighting. No wallet connection required.
              </p>

              <div className="bg-taxman-black/50 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* QR Code Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-taxman-gold/70 text-sm font-headline mb-2">
                      SCAN TO DONATE
                    </div>
                    <div className="bg-taxman-offwhite p-4 rounded-lg">
                      <div className="w-48 h-48 bg-taxman-charcoal flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📱</div>
                          <div className="text-taxman-offwhite text-sm">QR CODE</div>
                          <div className="text-taxman-green text-xs">COMING SOON</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Address Section */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-taxman-gold/70 text-sm font-headline mb-2">
                      TREASURY WALLET ADDRESS
                    </div>
                    <div className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-4 rounded-lg">
                      <div className="text-taxman-offwhite/50 text-sm font-mono break-all mb-2">
                        COMING SOON
                      </div>
                      <div className="text-taxman-green text-xs">
                        Solana mainnet address
                      </div>
                    </div>
                    <button
                      className="btn-taxman bg-taxman-green text-taxman-black w-full"
                      disabled
                    >
                      COPY ADDRESS - COMING SOON
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm text-taxman-gold/70 mb-2">LEARN MORE</div>
                <button
                  className="btn-taxman bg-taxman-gold text-taxman-black hover:bg-taxman-gold/90"
                  onClick={() => {
                    if (window.playSound) window.playSound('click')
                    navigate('/rewards')
                  }}
                >
                  VIEW ALL TIERS & REWARDS
                </button>
              </div>
            </div>

            {/* Pool Status */}
            <div className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6">
              <h2 className="text-2xl font-headline text-taxman-gold mb-4">POOL DISTRIBUTION</h2>
              
              {/* Split Breakdown */}
              <div className="mb-4">
                <div className="text-taxman-gold/70 text-xs font-headline mb-2">50/50 SPLIT</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-taxman-green/10 border border-taxman-green/30 p-2 text-center">
                    <div className="text-sm font-headline text-taxman-green">50% REWARDS</div>
                  </div>
                  <div className="bg-taxman-red/10 border border-taxman-red/30 p-2 text-center">
                    <div className="text-sm font-headline text-taxman-red">50% BURNS</div>
                  </div>
                </div>
              </div>

              {/* Lottery Pool */}
              <div className="mb-6">
                <div className="text-taxman-green/70 text-sm font-headline mb-2">LOTTERY POOL (40%)</div>
                <div className="text-3xl font-headline text-taxman-green mb-2">
                  ${airdropPool.toLocaleString()}
                </div>
                <div className="text-xs text-taxman-offwhite/50">
                  Daily: 10% draw = ${Math.floor(airdropPool * 0.1).toLocaleString()}
                </div>
              </div>

              {/* NFT Pool */}
              <div className="mb-6">
                <div className="text-taxman-gold/70 text-sm font-headline mb-2">NFT & REWARDS POOL (10%)</div>
                <div className="text-3xl font-headline text-taxman-gold mb-2">
                  ${Math.floor(airdropPool * 0.125).toLocaleString()}
                </div>
                <div className="text-xs text-taxman-offwhite/50">
                  NFTs, Discord roles, exclusive access
                </div>
              </div>

              {/* Tier Odds */}
              <div className="mb-6">
                <div className="text-taxman-gold/70 text-sm font-headline mb-3">YOUR WINNING CHANCES BY TIER</div>
                <div className="space-y-2">
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-charcoal">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">BagSquire</div>
                      <div className="text-sm font-headline text-taxman-gold">1x odds</div>
                    </div>
                  </div>
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-green">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">BagKnights</div>
                      <div className="text-sm font-headline text-taxman-green">2x odds</div>
                    </div>
                  </div>
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-gold">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">BagPrinces</div>
                      <div className="text-sm font-headline text-taxman-gold">5x odds</div>
                    </div>
                  </div>
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-red">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">BagLords</div>
                      <div className="text-sm font-headline text-taxman-red">10x odds</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Burn Pool */}
              <div className="mb-6">
                <div className="text-taxman-red/70 text-sm font-headline mb-2">BURN & FIGHT POOL (50%)</div>
                <div className="text-3xl font-headline text-taxman-red mb-2">
                  ${burnPool.toLocaleString()}
                </div>
                <div className="text-xs text-taxman-offwhite/50">
                  Token burns, bot fighting, strategic floor support
                </div>
              </div>

              {/* Upcoming Lottery */}
              <div>
                <div className="text-taxman-gold/70 text-sm font-headline mb-3">NEXT DRAW TIME</div>
                <div className="bg-taxman-black/50 p-3 border-l-2 border-taxman-green">
                  <div className="text-xs text-taxman-offwhite mb-1">Countdown</div>
                  <div className="text-sm font-headline text-taxman-green">
                    {formatTime(nextAirdrop)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

