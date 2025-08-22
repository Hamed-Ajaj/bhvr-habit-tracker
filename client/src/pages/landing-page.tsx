// src/pages/LandingPage.tsx
import { Link } from 'react-router-dom'
import { CheckCircle, TrendingUp, Target, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">HabitTracker</h1>
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Build Better Habits,<br />
          <span className="text-blue-600">One Day at a Time</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track your daily habits, visualize your progress, and stay motivated
          with streaks and insights. Start building the life you want today.
        </p>
        <Link
          to="/auth"
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block"
        >
          Start Tracking Free
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
            <p className="text-gray-600">
              Simple one-click logging for all your daily habits
            </p>
          </div>
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visual Progress</h3>
            <p className="text-gray-600">
              Beautiful charts and streaks to keep you motivated
            </p>
          </div>
          <div className="text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stay Consistent</h3>
            <p className="text-gray-600">
              Reminders and insights to help you stick to your goals
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Habits?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of people building better lives, one habit at a time.
          </p>
          <Link
            to="/auth"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 HabitTracker. Built with React, Hono, and Better-Auth.</p>
        </div>
      </footer>
    </div>
  )
}
