import { Outlet, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/landing-page'
import TodoList from './pages/todo.tsx'
import AuthPage from './pages/auth/auth-page'
import { Sidebar, SidebarProvider, SidebarTrigger } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/app-sidebar.tsx';
import HabitsPage from './pages/habits.tsx';
// const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
// Layout that includes the sidebar
function SidebarLayout() {
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
      <Route element={<SidebarLayout />}>
        <Route path="/todos" element={<TodoList />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos" element={<TodoList />} />
        {/* You can add more sidebar routes here */}
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
