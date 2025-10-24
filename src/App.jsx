import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Landing from './pages/Landing'
import Manifesto from './pages/Manifesto'
import Dashboard from './pages/Dashboard'
import Propaganda from './pages/Propaganda'
import Rewards from './pages/Rewards'
import AudioManager from './components/AudioManager'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-taxman-black text-taxman-offwhite">
        <AudioManager />
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/propaganda" element={<Propaganda />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

