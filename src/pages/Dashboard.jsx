import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const [totalDonated, setTotalDonated] = useState(2847392)
  const [airdropPool, setAirdropPool] = useState(1423696)
  const [burnPool, setBurnPool] = useState(1423696)
  const [nextAirdrop, setNextAirdrop] = useState(3600)
  const [userDonations, setUserDonations] = useState(0)
  const [userStatus, setUserStatus] = useState('Citizen')
  const [donationAmount, setDonationAmount] = useState('')
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, address: '0x742d...a3f1', donated: 50000, status: 'Legend' },
    { rank: 2, address: '0x8c91...7b2e', donated: 35000, status: 'VIP' },
    { rank: 3, address: '0x3f5a...c9d4', donated: 25000, status: 'VIP' },
    { rank: 4, address: '0x6d8e...1a7f', donated: 15000, status: 'Supporter' },
    { rank: 5, address: '0x9b2c...4e8a', donated: 10000, status: 'Supporter' },
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

  // Recent donations
  const recentDonations = [
    { address: '0xa1b2...c3d4', amount: 5000, time: '2m ago' },
    { address: '0xe5f6...g7h8', amount: 2500, time: '5m ago' },
    { address: '0xij9k...l0mn', amount: 10000, time: '8m ago' },
    { address: '0xop1q...r2st', amount: 1500, time: '12m ago' },
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
    setUserDonations(prev => prev + amount)
    setTotalDonated(prev => prev + amount)
    setAirdropPool(prev => prev + (amount * 0.5))
    setBurnPool(prev => prev + (amount * 0.5))
    
    // Update user status based on total donations
    const totalUserDonations = userDonations + amount
    if (totalUserDonations >= 50000) setUserStatus('Legend')
    else if (totalUserDonations >= 25000) setUserStatus('VIP')
    else if (totalUserDonations >= 10000) setUserStatus('Supporter')
    else if (totalUserDonations >= 1000) setUserStatus('Contributor')
    
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
                  window.location.href = '/rewards'
                }}
              >
                VIEW REWARDS & TIERS
              </button>
              <button
                className="btn-taxman text-taxman-green border-taxman-green hover:bg-taxman-green/10"
                onClick={() => {
                  if (window.playSound) window.playSound('click')
                  window.location.href = '/manifesto'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">TOTAL DONATED</div>
              <div className="text-4xl font-headline text-taxman-green">
                ${totalDonated.toLocaleString()}
              </div>
            </motion.div>

            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">NEXT AIRDROP</div>
              <div className="text-4xl font-headline text-taxman-green">
                {formatTime(nextAirdrop)}
              </div>
            </motion.div>

            <motion.div
              className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-taxman-gold/70 text-sm font-headline mb-2">YOUR STATUS</div>
              <div className="text-4xl font-headline text-taxman-green">
                {userStatus}
              </div>
            </motion.div>
          </div>

          {/* Current Tier Status */}
          <motion.div
            className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-2xl font-headline text-taxman-gold mb-2">YOUR STATUS</h2>
                <div className="text-4xl font-headline text-taxman-green mb-2">{userStatus}</div>
                <div className="text-sm text-taxman-offwhite/70">
                  ${userDonations.toLocaleString()} donated • Next tier at ${
                    userStatus === 'Citizen' ? '0.02' : 
                    userStatus === 'Contributor' ? '0.2' : 
                    userStatus === 'Supporter' ? '2' : 
                    userStatus === 'VIP' ? '20' : 'Max tier'
                  }
                </div>
              </div>
              <button
                className="btn-taxman bg-taxman-gold text-taxman-black hover:bg-taxman-gold/90 mt-4 md:mt-0"
                onClick={() => {
                  if (window.playSound) window.playSound('click')
                  window.location.href = '/rewards'
                }}
              >
                VIEW ALL REWARDS
              </button>
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

            {/* Recent Donations */}
            <div className="bg-taxman-charcoal border-2 border-taxman-green/50 p-6">
              <h2 className="text-2xl font-headline text-taxman-green mb-4">RECENT DONATIONS</h2>
              <div className="space-y-3">
                {recentDonations.map((donation, i) => (
                  <motion.div
                    key={i}
                    className="bg-taxman-black/50 p-3 border-l-4 border-taxman-green"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="font-mono text-sm text-taxman-offwhite">{donation.address}</div>
                    <div className="text-taxman-green font-headline">
                      ${donation.amount.toLocaleString()} • {donation.time}
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
                Send any amount to our treasury wallet. 50% goes to airdrops, 50% to burns and bot fighting. No wallet connection required.
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

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-taxman-gold/70 mb-1">YOUR DONATIONS</div>
                  <div className="text-3xl font-headline text-taxman-green">${userDonations.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-taxman-gold/70 mb-1">YOUR STATUS</div>
                  <div className="text-3xl font-headline text-taxman-gold">{userStatus}</div>
                </div>
              </div>
            </div>

            {/* Pool Status */}
            <div className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-6">
              <h2 className="text-2xl font-headline text-taxman-gold mb-4">POOL STATUS</h2>
              
              {/* Airdrop Pool */}
              <div className="mb-6">
                <div className="text-taxman-green/70 text-sm font-headline mb-2">AIRDROP POOL (50%)</div>
                <div className="text-3xl font-headline text-taxman-green mb-2">
                  ${airdropPool.toLocaleString()}
                </div>
                <div className="text-xs text-taxman-offwhite/50">
                  Daily lotteries, NFTs, status roles
                </div>
              </div>

              {/* Burn Pool */}
              <div className="mb-6">
                <div className="text-taxman-red/70 text-sm font-headline mb-2">BURN POOL (50%)</div>
                <div className="text-3xl font-headline text-taxman-red mb-2">
                  ${burnPool.toLocaleString()}
                </div>
                <div className="text-xs text-taxman-offwhite/50">
                  Token burns, bot fighting, floor support
                </div>
              </div>

              {/* Upcoming Airdrops */}
              <div>
                <div className="text-taxman-gold/70 text-sm font-headline mb-3">UPCOMING AIRDROPS</div>
                <div className="space-y-2">
                  {upcomingAirdrops.map((airdrop, i) => (
                    <div key={i} className="bg-taxman-black/50 p-2 border-l-2 border-taxman-green">
                      <div className="text-xs text-taxman-offwhite">{airdrop.type}</div>
                      <div className="text-sm font-headline text-taxman-green">
                        ${airdrop.pool.toLocaleString()} • {airdrop.time}
                      </div>
                    </div>
                  ))}
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

