import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import TodoList from './pages/todo.tsx'
import AuthPage from './pages/auth/auth-page'
// const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/todos" element={<TodoList />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
