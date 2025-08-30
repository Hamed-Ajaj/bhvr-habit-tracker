import { Link } from "react-router-dom";
import { useSession, signOut } from '@/lib/auth-client'
import { Button } from "./ui/button";

const Navbar = () => {

  const { data: session, isPending } = useSession()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">HabitTracker</h1>
        {session && !isPending ? (

          <div className="space-x-4 flex items-center">
            <p>
              Welcome, {session.user?.name}
            </p>
            <Link
              to="/todos"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>
            <Button variant="outline" onClick={() => signOut()}>Logout</Button>
          </div>
        ) : (

          <div className="space-x-4">
            <Link
              to="/sign-in"
              className="text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        )
        }
      </div >
    </header >
  )
}

export default Navbar;
