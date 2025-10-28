// Centralized data configuration for $TAXMAN
// Replace these with real values when connecting to blockchain

export const TAXMAN_DATA = {
  // Pool Data
  totalDonated: 0,
  airdropPool: 0,
  burnPool: 0,
  
  // Timer Data
  nextAirdropInSeconds: 86400, // Default to 24 hours
  
  // Hall of Fame - Replace with real donor data
  hallOfFame: [
    // Will be populated from blockchain
  ],
  
  // Today's Winners (1st, 2nd, 3rd place)
  todaysWinner: {
    address: 'No winner yet',
    prize: '0 SOL',
    prizeType: 'Waiting for first draw',
    time: 'Waiting...'
  },
  secondPlace: {
    address: 'No winner yet',
    prize: '0 SOL',
    prizeType: 'Waiting for first draw',
    time: 'Waiting...'
  },
  thirdPlace: {
    address: 'No winner yet',
    prize: '0 SOL',
    prizeType: 'Waiting for first draw',
    time: 'Waiting...'
  },
  
  // Recent Burns
  recentBurns: [
    // Will be populated from blockchain
  ],
  
  // Upcoming Airdrops
  upcomingAirdrops: [
    // Will be populated from blockchain
  ],
  
  // Treasury Wallet Address (set when deployed)
  treasuryWallet: 'COMING SOON',
  
  // Contract Address (set when deployed)
  contractAddress: 'COMING SOON',
  
  // Disable auto-increment of numbers (set to false for real data)
  enableAutoIncrement: false,
}


