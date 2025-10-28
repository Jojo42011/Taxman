import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TAXMAN_DATA } from '../config/data'

const Dashboard = () => {
  const navigate = useNavigate()
  const [totalDonated, setTotalDonated] = useState(TAXMAN_DATA.totalDonated)
  const [airdropPool, setAirdropPool] = useState(TAXMAN_DATA.airdropPool)
  const [burnPool, setBurnPool] = useState(TAXMAN_DATA.burnPool)
  
  // Load timer from localStorage or use default 24 hours
  const getInitialTimer = () => {
    const stored = localStorage.getItem('nextAirdropTimer')
    if (stored) {
      const timeLeft = parseInt(stored) - Math.floor(Date.now() / 1000)
      return timeLeft > 0 ? timeLeft : 86400
    }
    return 86400 // 24 hours
  }
  
  const [nextAirdrop, setNextAirdrop] = useState(getInitialTimer)
  const [donationAmount, setDonationAmount] = useState('')
  const [walletCopied, setWalletCopied] = useState(false)
  
  const TREASURY_WALLET = 'H5e1XYbX6cSYcjTVYvwaTujaLU83cg8hRPrvXpKzXXUw'
  
  // Hall of Fame Donators - Empty until real data available
  const hallOfFame = TAXMAN_DATA.hallOfFame
  
  // Today's Lottery Winners
  const todaysWinner = TAXMAN_DATA.todaysWinner
  const secondPlace = TAXMAN_DATA.secondPlace
  const thirdPlace = TAXMAN_DATA.thirdPlace

  // Recent Burn Transactions (Proof of Burns)
  const recentBurns = TAXMAN_DATA.recentBurns

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    // Only auto-increment if enabled (disabled for production)
    if (TAXMAN_DATA.enableAutoIncrement) {
      // Animate counters
      const interval = setInterval(() => {
        setTotalDonated(prev => prev + Math.floor(Math.random() * 100))
        setAirdropPool(prev => prev + Math.floor(Math.random() * 50))
        setBurnPool(prev => prev + Math.floor(Math.random() * 50))
      }, 3000)

      return () => clearInterval(interval)
    }

    // Initialize timer end time if not set
    if (!localStorage.getItem('nextAirdropTimer')) {
      const endTime = Math.floor(Date.now() / 1000) + 86400
      localStorage.setItem('nextAirdropTimer', endTime.toString())
    }

    // Countdown timer with persistence
    const timer = setInterval(() => {
      const storedEndTime = localStorage.getItem('nextAirdropTimer')
      if (storedEndTime) {
        const timeLeft = parseInt(storedEndTime) - Math.floor(Date.now() / 1000)
        if (timeLeft > 0) {
          setNextAirdrop(timeLeft)
        } else {
          // Timer expired, reset to 24 hours
          const newEndTime = Math.floor(Date.now() / 1000) + 86400
          localStorage.setItem('nextAirdropTimer', newEndTime.toString())
          setNextAirdrop(86400)
        }
      }
    }, 1000)

    return () => clearInterval(timer)
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

  const copyWalletAddress = () => {
    if (window.playSound) window.playSound('click')
    navigator.clipboard.writeText(TREASURY_WALLET)
    setWalletCopied(true)
    setTimeout(() => setWalletCopied(false), 2000)
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

          {/* Today's Lottery Winners */}
          <motion.div
            className="bg-taxman-charcoal border-2 border-taxman-gold/50 p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="text-6xl">🏆</div>
            </div>
            <h2 className="text-2xl font-headline text-taxman-gold mb-6 text-center">
              TODAY'S LOTTERY WINNERS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1st Place */}
              <div className="bg-taxman-black/50 border-2 border-taxman-green/50 p-6 text-center">
                <div className="text-taxman-gold/70 text-sm font-headline mb-2">🥇 1ST PLACE</div>
                <div className="font-mono text-sm text-taxman-offwhite mb-3 break-all">{todaysWinner.address}</div>
                <div className="text-2xl font-headline text-taxman-green mb-2">
                  {todaysWinner.prize}
                </div>
                <div className="text-taxman-gold font-headline text-xs">{todaysWinner.prizeType}</div>
                <div className="text-taxman-offwhite/50 text-xs mt-1">{todaysWinner.time}</div>
              </div>

              {/* 2nd Place */}
              <div className="bg-taxman-black/50 border-2 border-taxman-gold/30 p-6 text-center">
                <div className="text-taxman-gold/70 text-sm font-headline mb-2">🥈 2ND PLACE</div>
                <div className="font-mono text-sm text-taxman-offwhite mb-3 break-all">{secondPlace.address}</div>
                <div className="text-xl font-headline text-taxman-gold mb-2">
                  {secondPlace.prize}
                </div>
                <div className="text-taxman-gold/70 font-headline text-xs">{secondPlace.prizeType}</div>
                <div className="text-taxman-offwhite/50 text-xs mt-1">{secondPlace.time}</div>
              </div>

              {/* 3rd Place */}
              <div className="bg-taxman-black/50 border-2 border-taxman-offwhite/20 p-6 text-center">
                <div className="text-taxman-gold/70 text-sm font-headline mb-2">🥉 3RD PLACE</div>
                <div className="font-mono text-sm text-taxman-offwhite mb-3 break-all">{thirdPlace.address}</div>
                <div className="text-lg font-headline text-taxman-offwhite mb-2">
                  {thirdPlace.prize}
                </div>
                <div className="text-taxman-offwhite/70 font-headline text-xs">{thirdPlace.prizeType}</div>
                <div className="text-taxman-offwhite/50 text-xs mt-1">{thirdPlace.time}</div>
              </div>
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
                {hallOfFame.length > 0 ? hallOfFame.map((donator, i) => (
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
                )) : (
                  <div className="text-center py-8">
                    <div className="text-taxman-offwhite/50 font-headline mb-2">NO DONATORS YET</div>
                    <div className="text-sm text-taxman-gold/70">Be the first to donate and claim your spot!</div>
                  </div>
                )}
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
                      <img 
                        src="/solana-wallet-qr.png" 
                        alt="Scan QR code to donate to Taxman treasury"
                        className="w-48 h-48"
                      />
                    </div>
                  </div>

                  {/* Wallet Address Section */}
                  <div className="flex flex-col space-y-4">
                    <div className="text-taxman-gold/70 text-sm font-headline mb-2">
                      TREASURY WALLET ADDRESS
                    </div>
                    <div className="bg-taxman-charcoal border-2 border-taxman-gold/30 p-4 rounded-lg">
                      <div className="text-taxman-offwhite text-sm font-mono break-all mb-2">
                        {TREASURY_WALLET}
                      </div>
                      <div className="text-taxman-green text-xs">
                        Solana mainnet address
                      </div>
                    </div>
                    <button
                      className="btn-taxman bg-taxman-green text-taxman-black w-full hover:bg-taxman-green/90"
                      onClick={copyWalletAddress}
                    >
                      {walletCopied ? '✓ COPIED!' : 'COPY ADDRESS'}
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
                      <div className="text-xs text-taxman-offwhite">TaxAgent</div>
                      <div className="text-sm font-headline text-taxman-gold">1x odds</div>
                    </div>
                  </div>
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-green">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">FieldAgent</div>
                      <div className="text-sm font-headline text-taxman-green">2x odds</div>
                    </div>
                  </div>
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-gold">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">SpecialAgent</div>
                      <div className="text-sm font-headline text-taxman-gold">5x odds</div>
                    </div>
                  </div>
                  <div className="bg-taxman-black/50 p-2 border-l-4 border-taxman-red">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-taxman-offwhite">ChiefAgent</div>
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

              {/* Recent Burn Transactions */}
              <div>
                <div className="text-taxman-red/70 text-sm font-headline mb-3">RECENT BURN TRANSACTIONS</div>
                <div className="space-y-2">
                  {recentBurns.length > 0 ? recentBurns.map((burn, i) => (
                    <motion.div
                      key={i}
                      className="bg-taxman-black/50 p-3 border-l-4 border-taxman-red"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-mono text-xs text-taxman-offwhite">{burn.tx}</div>
                        <div className="text-taxman-red font-headline text-sm">{burn.amount}</div>
                      </div>
                      <div className="text-xs text-taxman-offwhite/70 flex items-center justify-between">
                        <span>Bought at {burn.price}</span>
                        <span className="text-taxman-red">{burn.wallet}</span>
                      </div>
                      <div className="text-xs text-taxman-offwhite/50 mt-1">{burn.time}</div>
                    </motion.div>
                  )) : (
                    <div className="text-center py-4">
                      <div className="text-taxman-offwhite/50 text-xs mb-1">NO BURNS YET</div>
                      <div className="text-xs text-taxman-gold/70">Burns will appear here after launch</div>
                    </div>
                  )}
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

