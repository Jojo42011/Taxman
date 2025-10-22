# $TAXMAN - The People's Audit

A revolutionary crypto memecoin website featuring a sophisticated cyberpunk aesthetic with interactive elements and gamification.

## 🎨 Features

- **Landing Page**: Animated hero section with the Taxman mascot, floating financial data, and compelling CTAs
- **Manifesto Page**: Interactive protocol clauses with stamp approval effects
- **Live Audit Dashboard**: Real-time metrics, price charts, bot detection game, and leaderboards
- **Propaganda Page**: Shareable meme grid for community-driven content dissemination
- **Taxman Mascot**: Custom-animated character with a money bag head and pixelated expressions
- **Sound Effects**: Interactive audio feedback for all major actions
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Color Palette

- **Primary**: Deep charcoal (#1a1a1a), Black (#0a0a0a), Off-White (#f5f5dc)
- **Accent**: Muted Gold (#b8860b), Electric Green (#00ff41)
- **Alert**: Bold Red (#ff0033)

## 🎵 Sound Effects

The website includes interactive sound effects:
- `click`: Standard button clicks
- `cash`: Primary CTAs (Begin Audit, etc.)
- `stamp`: Approval actions
- `error`: Incorrect audit verdicts

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx       # Main navigation bar
│   ├── TaxmanMascot.jsx    # Animated mascot component
│   └── AudioManager.jsx     # Sound effects manager
├── pages/
│   ├── Landing.jsx          # Homepage
│   ├── Manifesto.jsx        # Protocol clauses
│   ├── Dashboard.jsx        # Live audit terminal
│   └── Propaganda.jsx       # Meme/media grid
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
└── index.css               # Global styles
```

## 🛠️ Technologies

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **Recharts**: Chart components

## 🎯 Key Interactive Elements

### Dashboard Audit Game
- Random wallet analysis
- Bot detection challenge
- Point scoring system
- Real-time leaderboard

### Manifesto Clauses
- Hover to reveal Taxman mascot
- Click to stamp "APPROVED"
- Satisfying sound effects
- Smooth animations

### Propaganda Sharing
- One-click copy to clipboard
- Community submission system
- Grid layout with hover effects
- Social media integration ready

## 🔧 Customization

### Adding New Pages
1. Create a new file in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/Navigation.jsx`

### Modifying Colors
Update `tailwind.config.js` in the `extend.colors` section

### Adding Sounds
Use `window.playSound(type)` in any component after AudioManager loads

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1280px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎭 Theme & Vibe

The site combines:
- **American Psycho** business aesthetics
- **V for Vendetta** revolutionary themes
- **Cyberpunk** visual elements
- **Crypto/DeFi** terminal interfaces
- **Memecoin** community energy

## 📄 License

This project is for demonstration purposes.

## 🤝 Contributing

The revolution needs your skills! Join our community to contribute memes, features, or improvements.

---

**THE TAXMAN COMIN'.**

