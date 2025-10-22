# Quick Start Guide for $TAXMAN Website

## 🚀 Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

This will install:
- React & React DOM
- React Router for navigation
- Framer Motion for animations
- Recharts for the dashboard charts
- Tailwind CSS for styling
- Vite for fast development

### Step 2: Start Development Server
```bash
npm run dev
```

The site will be available at: **http://localhost:5173**

### Step 3: Explore the Features

Navigate through the site:
- **Home** (`/`) - Landing page with hero section
- **The Protocol** (`/manifesto`) - Interactive manifesto with stamp effects
- **Live Audit** (`/dashboard`) - Real-time metrics and bot detection game
- **Propaganda** (`/propaganda`) - Meme sharing grid

## 🎮 Interactive Features to Test

### Landing Page
- Click "BEGIN AUDIT" to hear cash register sound and navigate
- Scroll down to see animations trigger
- Watch the floating financial data

### Manifesto
- Hover over clauses to see the Taxman appear
- Click clauses to stamp them as "APPROVED"
- Listen for the stamp sound effect

### Dashboard
- Watch counters update in real-time
- Click "BEGIN AUDIT" in the audit game
- Try to identify bot vs. legitimate wallets
- Earn points for correct identifications
- See your score on the leaderboard

### Propaganda
- Hover over meme cards for effects
- Click "SHARE" to copy content to clipboard
- Watch for the "COPIED!" confirmation

## 🔧 Development Tips

### Hot Module Replacement
Vite provides instant HMR - just save your files and see changes immediately.

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Main page components
├── App.jsx         # Router setup
├── main.jsx        # Entry point
└── index.css       # Global styles + Tailwind
```

### Adding New Features

**New Page:**
1. Create `src/pages/YourPage.jsx`
2. Add route in `src/App.jsx`
3. Add nav link in `src/components/Navigation.jsx`

**New Animation:**
Use Framer Motion:
```jsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**New Sound:**
Call from any component:
```jsx
if (window.playSound) window.playSound('cash')
// Available: 'click', 'cash', 'stamp', 'error'
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  'taxman-charcoal': '#1a1a1a',
  'taxman-black': '#0a0a0a',
  'taxman-offwhite': '#f5f5dc',
  'taxman-gold': '#b8860b',
  'taxman-green': '#00ff41',
  'taxman-red': '#ff0033',
}
```

### Fonts
Already loaded from Google Fonts:
- Headlines: `Bebas Neue`
- Body: `Inter`

## 📦 Build for Production

```bash
npm run build
```

Optimized files will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
Check the console for specific errors. Most common:
- Missing imports
- Typos in component names
- Tailwind class conflicts

## 🎯 Performance Tips

1. **Images**: Add images to `public/` folder
2. **Lazy Loading**: React.lazy() for page components (if needed)
3. **Code Splitting**: Vite handles this automatically
4. **Animations**: Framer Motion is optimized for 60fps

## 📱 Testing Responsive Design

Open Chrome DevTools (F12) and toggle device toolbar (Ctrl+Shift+M) to test:
- Mobile (375px)
- Tablet (768px)
- Desktop (1920px)

All breakpoints are handled with Tailwind's responsive prefixes:
- `md:` = 768px+
- `lg:` = 1024px+

---

## 🎉 You're Ready!

The revolution is tokenized. Start building!

**THE TAXMAN COMIN'.**

