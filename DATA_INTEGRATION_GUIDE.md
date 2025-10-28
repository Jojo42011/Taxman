# Data Integration Guide for $TAXMAN

## Overview

The website has been updated to display **$0 values** and empty states for all metrics until real blockchain data is connected at launch.

## Key Changes

### 1. Centralized Data Configuration

All metrics are now controlled via `src/config/data.js`. This makes it easy to replace with real data at launch.

### 2. Current Values (Pre-Launch)

- **Total Donated**: $0
- **Airdrop Pool**: $0
- **Burn Pool**: $0
- **Hall of Fame**: Empty (shows "NO DONATORS YET")
- **Today's Winner**: "No winner yet"
- **Recent Burns**: Empty (shows "NO BURNS YET")
- **Floating Animation**: Shows $0.00 instead of random amounts

### 3. Empty State Handling

All sections now gracefully handle empty data:
- Hall of Fame shows a helpful message when empty
- Burn transactions section shows a placeholder
- All amounts display as $0 or "Coming Soon"

## How to Connect Real Data

### Step 1: Replace Data Configuration

Edit `src/config/data.js` and replace with real blockchain data:

```javascript
export const TAXMAN_DATA = {
  totalDonated: 1234567,  // From your treasury contract
  airdropPool: 617283,    // 50% of donations
  burnPool: 617283,       // 50% of donations
  
  hallOfFame: [
    { rank: 1, address: 'Tgx1P...a3f1', donated: 25.5, status: 'BagLords' },
    // Add real donor data from blockchain
  ],
  
  todaysWinner: {
    address: 'Tgx7h...k9m3',
    prize: '500 SOL',
    prizeType: 'Token Airdrop',
    time: '2h 35m ago'
  },
  
  recentBurns: [
    // Add real burn transaction data
  ],
  
  treasuryWallet: 'Your_Treasury_Wallet_Address_Here',
  contractAddress: 'Your_Contract_Address_Here',
}
```

### Step 2: Connect to Blockchain (Optional)

For live data, replace the static config with a data fetching hook:

```javascript
// src/hooks/useTaxmanData.js
import { useState, useEffect } from 'react'

export const useTaxmanData = () => {
  const [data, setData] = useState({
    totalDonated: 0,
    airdropPool: 0,
    // ... other fields
  })
  
  useEffect(() => {
    // Fetch data from your Solana program/contract
    const fetchData = async () => {
      // TODO: Connect to blockchain
      // const treasuryBalance = await fetchTreasuryBalance()
      // setData(treasuryBalance)
    }
    
    fetchData()
    const interval = setInterval(fetchData, 5000) // Poll every 5 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  return data
}
```

Then in Dashboard.jsx:

```javascript
import { useTaxmanData } from '../hooks/useTaxmanData'

const Dashboard = () => {
  const realData = useTaxmanData()
  const [totalDonated, setTotalDonated] = useState(realData.totalDonated)
  // ...
}
```

## Launch Checklist

- [ ] Update `src/config/data.js` with real contract address
- [ ] Set `treasuryWallet` to your treasury wallet address
- [ ] Connect Solana Web3.js for live data (optional)
- [ ] Replace QR code placeholder with real QR code
- [ ] Test all empty states display correctly
- [ ] Verify all $0 values update when first donations arrive

## File Locations

- **Data Config**: `src/config/data.js`
- **Dashboard**: `src/pages/Dashboard.jsx`
- **Propaganda**: `src/pages/Propaganda.jsx`
- **Landing**: `src/pages/Landing.jsx`

## Notes

- The auto-increment feature is **disabled** by default (`enableAutoIncrement: false`)
- All sections handle empty data gracefully
- Counter animations only work if `enableAutoIncrement: true`
- When connecting real data, remove the `useState` updates that modify the values


