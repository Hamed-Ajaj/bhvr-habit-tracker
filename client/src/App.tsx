import { useState } from 'react'
import beaver from './assets/beaver.svg'
import { ApiResponse } from 'shared'
import { Button } from './components/ui/button'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import DashboardPage from './pages/dashboard'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}

export default App
