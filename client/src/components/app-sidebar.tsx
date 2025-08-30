import {
  Calendar,
  Home,
  CheckSquare,
  Target,
  Timer,
  BarChart3,
  Trophy,
  Settings,
  User,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "@/lib/auth-client"

// Main navigation items
const mainItems = [
  {
    title: "Todos",
    url: "/todos",
    icon: CheckSquare,
  },
  {
    title: "Focus Timer",
    url: "/focus",
    icon: Timer,
  },
  {
    title: "Habits",
    url: "/habits",
    icon: Target,
  },
]

// Analytics & extras
const analyticsItems = [
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Challenges",
    url: "/challenges",
    icon: Trophy,
  },
]

export function AppSidebar() {
  const location = useLocation()
  // const userName = "Hamed" // You can get this from your auth context
  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  return (
    <Sidebar className="border-r border-slate-200 bg-slate-50">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-slate-200 p-6">
        <Link to="/todos" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">HabitFlow</h1>
            <p className="text-xs text-slate-500">Track & Achieve</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        w-full rounded-lg transition-all duration-200 hover:bg-slate-100
                        ${isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500 font-medium'
                          : 'text-slate-700 hover:text-slate-900'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center space-x-3 px-3 py-2.5">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics Section */}
        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {analyticsItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        w-full rounded-lg transition-all duration-200 hover:bg-slate-100
                        ${isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500 font-medium'
                          : 'text-slate-700 hover:text-slate-900'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center space-x-3 px-3 py-2.5">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Info */}
      <SidebarFooter className="border-t border-slate-200 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={session?.user?.image} className="object-cover" alt={userName} />
                <AvatarFallback className="bg-blue-600  text-white text-sm font-medium">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-slate-900">{userName}</p>
                <p className="text-xs text-slate-500">Software Developer</p>
              </div>
              <Settings className="w-4 h-4 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2 text-red-600" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
