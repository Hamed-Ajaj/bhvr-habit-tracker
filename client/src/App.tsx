import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import TodoList from './pages/todo.tsx'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/app-sidebar.tsx';
import HabitsPage from './pages/habits.tsx';
import FocusPage from './pages/focus.tsx';
import { useSession } from './lib/auth-client.ts';
import SignIn from './pages/auth/signIn.tsx';
import SignUp from './pages/auth/auth-page';
import { useEffect } from 'react';
// const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
// Layout that includes the sidebar
function SidebarLayout() {
  const { data: session, isPending } = useSession()
  console.log('Session data:', session);
  const navigate = useNavigate();
  if (isPending) <h1>loading</h1>
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
      </Route>

    </Routes>
  )
}

export default App
