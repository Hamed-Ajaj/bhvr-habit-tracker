import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import DashboardPage from './pages/dashboard'
import AuthPage from './pages/auth/auth-page'
// const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
