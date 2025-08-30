import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import TodoList from './pages/todo.tsx'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/app-sidebar.tsx';
import HabitsPage from './pages/habits.tsx';
import FocusPage from './pages/focus.tsx';
import { useSession } from './lib/auth-client.ts';
import SignIn from './pages/auth/signIn.tsx';
import SignUp from './pages/auth/sign-up.tsx';
import { useEffect } from 'react';
import Analytics from './pages/analytics.tsx';
import Loader from './components/ui/loader.tsx';
import ChallengesPage from './pages/challenges.tsx';
import SettingsPage from './pages/settings.tsx';

function SidebarLayout() {
  const { data: session, isPending } = useSession()
  const navigate = useNavigate();
  if (isPending) {
    return <Loader />
  }
  useEffect(() => {
    if (!session && !isPending) {
      navigate('/sign-in')
    }
  }, [session, navigate])
  return (
    <SidebarProvider>

      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className='w-full p-4 overflow-y-auto'>
          <SidebarTrigger />
          <Outlet /> {/* This renders the child route */}
        </div>
      </div>

    </SidebarProvider>
  );
}

function App() {

  const { data: session, isPending } = useSession()
  if (isPending) {
    return <Loader />
  }
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route element={<SidebarLayout />}>
        <Route path="/todos" element={<TodoList />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

    </Routes>
  )
}

export default App
