import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Navigation = () => {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState(null)

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/manifesto', label: 'HOW IT WORKS' },
    { path: '/dashboard', label: 'COMMUNITY HUB' },
    { path: '/rewards', label: 'REWARDS' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-taxman-black/90 backdrop-blur-md border-b border-taxman-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-headline text-taxman-gold">TAXMAN</span>
          </Link>
          
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <span className={`font-headline text-lg transition-colors duration-300 ${
                  location.pathname === item.path 
                    ? 'text-taxman-green' 
                    : hoveredItem === item.path 
                    ? 'text-taxman-gold' 
                    : 'text-taxman-offwhite'
                }`}>
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-taxman-green"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

