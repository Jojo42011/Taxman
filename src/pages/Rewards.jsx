import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Rewards = () => {
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const rewardTiers = [
    {
      name: 'TaxAgent',
      minDonation: '0.001',
      maxDonation: '0.009',
      bgClass: 'bg-taxman-charcoal',
      borderClass: 'border-taxman-offwhite/30',
      benefits: [
        'Airdrop Lottery Access',
        'Squire Discord role + badge',
        '+10% shilling bonus'
      ],
      airdropOdds: '1x',
      nftAccess: 'Basic',
      status: 'Community Member'
    },
    {
      name: 'FieldAgent',
      minDonation: '0.01',
      maxDonation: '0.09',
      bgClass: 'bg-taxman-charcoal',
      borderClass: 'border-taxman-green/50',
      benefits: [
        'FieldAgent Discord role + badge',
        '2x Airdrop Lottery Odds',
        '+20% shilling bonus',
        'Field Agent Raid - Top 10 get 50k tokens'
      ],
      airdropOdds: '2x',
      nftAccess: 'Rare',
      status: 'Active Contributor'
    },
    {
      name: 'SpecialAgent',
      minDonation: '0.1',
      maxDonation: '0.9',
      bgClass: 'bg-taxman-charcoal',
      borderClass: 'border-taxman-gold/50',
      benefits: [
        'SpecialAgent role + badge',
        '5x Airdrop Lottery Odds',
        '+30% shilling bonus',
        'Custom NFT access',
        'Exclusive channel for early launches',
        'Special Agent Raid - Top 10 get 100k tokens'
      ],
      airdropOdds: '5x',
      nftAccess: 'Legendary',
      status: 'VIP Supporter'
    },
    {
      name: 'ChiefAgent',
      minDonation: '1',
      maxDonation: '∞',
      bgClass: 'bg-taxman-charcoal',
      borderClass: 'border-taxman-red/50',
      benefits: [
        'ChiefAgent role + badge',
        '10x Airdrop Lottery Odds',
        '+50% shilling bonus',
        'Mythic NFT access',
        'Co-create future coins with devs',
        'Chief Agent Raid - Top 10 get 250k tokens'
      ],
      airdropOdds: '10x',
      nftAccess: 'Mythic',
      status: 'Legendary Member'
    }
  ]

  const rewardTypes = [
    {
      title: 'DAILY AIRDROPS',
      description: '50% of donations fund daily rewards',
      icon: '🎁',
      details: [
        'Tier-based odds (1x to 10x)',
        'Daily lottery drawings',
        'NFT drops for higher tiers',
        'Special event bonuses'
      ]
    },
    {
      title: 'DISCORD ROLES',
      description: 'Status roles and exclusive access',
      icon: '👑',
      details: [
        'Tier-based custom roles',
        'Exclusive channels',
        'Priority access',
        'Direct team communication'
      ]
    },
    {
      title: 'SHILLING BONUS',
      description: 'Earn extra for spreading the word',
      icon: '📢',
      details: [
        'Bonus rewards for sharing',
        'Tier-based bonus rates',
        'Social media campaigns',
        'Community growth incentives'
      ]
    },
    {
      title: 'EXCLUSIVE ACCESS',
      description: 'Early notice and priority access',
      icon: '🔒',
      details: [
        'Early launch announcements',
        'New feature priority',
        'Beta testing access',
        'Founder perks'
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-taxman-black to-taxman-charcoal">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-7xl md:text-8xl font-headline text-taxman-gold mb-6">
              REWARDS & TIERS
            </h1>
            <p className="text-xl text-taxman-offwhite/70 max-w-4xl mx-auto">
              Donate to the community treasury and unlock exclusive rewards, 
              airdrops, Discord roles, and governance rights. The more you contribute, 
              the better your rewards!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tier System */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-headline text-taxman-gold mb-12 text-center">
              COMMUNITY TIERS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewardTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  className={`relative ${tier.bgClass} ${tier.borderClass} border-2 p-6 cursor-pointer transition-all duration-300 hover:scale-105 min-h-[400px]`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ borderColor: '#00ff41' }}
                  onClick={() => setSelectedTier(selectedTier === tier.name ? null : tier.name)}
                >
                  {/* Tier Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-taxman-gold text-taxman-black px-4 py-1 text-sm font-headline">
                      {tier.name}
                    </div>
                  </div>

                  {/* Min Donation */}
                  <div className="text-center mb-4">
                    <div className="text-2xl font-headline mb-2 text-taxman-offwhite">
                      {tier.maxDonation === '∞' ? `${tier.minDonation}+ SOL` : `${tier.minDonation}-${tier.maxDonation} SOL`}
                    </div>
                    <div className="text-sm text-taxman-gold/70">SOL RANGE</div>
                  </div>

                  {/* Key Stats */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-taxman-offwhite/70">Airdrop Lottery Odds:</span>
                      <span className="text-taxman-green font-headline">{tier.airdropOdds}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-taxman-offwhite/70">50% Burns:</span>
                      <span className="text-taxman-red font-headline">
                        {tier.maxDonation === '∞' ? `${(parseFloat(tier.minDonation) * 0.5).toFixed(4)}+ SOL` : `${(parseFloat(tier.minDonation) * 0.5).toFixed(4)}-${(parseFloat(tier.maxDonation) * 0.5).toFixed(4)} SOL`}
                      </span>
                    </div>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="text-taxman-green text-sm mt-0.5">▸</div>
                        <div className="text-xs text-taxman-offwhite/80">{benefit}</div>
                      </div>
                    ))}
                  </div>

                  {/* Selected State */}
                  {selectedTier === tier.name && (
                    <motion.div
                      className="absolute inset-0 bg-taxman-green/10 border-2 border-taxman-green"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reward Types */}
      <section className="relative py-20 px-6 bg-taxman-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-headline text-taxman-gold mb-12 text-center">
              REWARD TYPES
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {rewardTypes.map((reward, index) => (
                <motion.div
                  key={reward.title}
                  className="bg-taxman-black/50 border-2 border-taxman-gold/30 p-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ borderColor: '#00ff41', scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{reward.icon}</div>
                    <div>
                      <h3 className="text-2xl font-headline text-taxman-offwhite mb-2">
                        {reward.title}
                      </h3>
                      <p className="text-taxman-gold/70">{reward.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {reward.details.map((detail, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <div className="text-taxman-green text-sm mt-1">•</div>
                        <div className="text-taxman-offwhite/80 text-sm">{detail}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-headline text-taxman-gold mb-12 text-center">
              HOW IT WORKS
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'DONATE',
                  description: 'Send SOL to our community treasury wallet',
                  details: 'Donate 0.001-0.009 SOL to become TaxAgent. Higher amounts unlock Field Agent, Special Agent, or Chief Agent tiers.'
                },
                {
                  step: '02',
                  title: 'UNLOCK TIER',
                  description: 'Your donation amount unlocks your tier status',
                  details: 'TaxAgent → Field Agent → Special Agent → Chief Agent. Each tier gets better airdrop odds and exclusive perks.'
                },
                {
                  step: '03',
                  title: 'EARN REWARDS',
                  description: 'Receive airdrops, NFTs, roles, and bonuses',
                  details: '50% of donations fund rewards (airdrops, raids, shilling bonuses), 50% burns tokens and supports the chart.'
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-6xl font-headline text-taxman-gold/30 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-headline text-taxman-offwhite mb-4">
                    {step.title}
                  </h3>
                  <p className="text-taxman-gold/70 mb-4">{step.description}</p>
                  <p className="text-taxman-offwhite/60 text-sm">{step.details}</p>
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
            <h2 className="text-6xl font-headline text-taxman-offwhite mb-8">
              JOIN THE COMMUNITY
            </h2>
            <p className="text-xl text-taxman-gold mb-12">
              Start your journey as TaxAgent and climb to Chief Agent. 
              Every donation counts toward building a stronger community!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                className="btn-taxman bg-taxman-green text-taxman-black hover:bg-taxman-green/90"
                onClick={() => {
                  if (window.playSound) window.playSound('cash')
                  navigate('/dashboard')
                }}
              >
                START DONATING
              </button>
              <button
                className="btn-taxman text-taxman-gold border-taxman-gold hover:bg-taxman-gold/10"
                onClick={() => {
                  if (window.playSound) window.playSound('click')
                  window.open('https://discord.gg/kAzq2gszyV', '_blank')
                }}
              >
                JOIN DISCORD
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Rewards
