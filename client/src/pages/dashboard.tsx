// import { useEffect, useState } from "react";
//
// const DashboardPage = () => {
//   const [habits, setHabits] = useState('')
//   const [name, setName] = useState("")
//   const [desc, setDesc] = useState("")
//   useEffect(() => {
//     const fetchHabits = async () => {
//       const res = await fetch("http://localhost:3000/habits")
//       const data = await res.json()
//
//       setHabits(data.data)
//     }
//     fetchHabits()
//   }, [])
//
//   const postHabit = async () => {
//     const res = await fetch("http://localhost:3000/habits", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: name, description: desc })
//     })
//     setHabits(prev => [...prev, { name: name, descritpion: desc }])
//   }
//
//   console.log(habits)
//   return (
//     <>
//       <div>DashboardPage</div>
//       <input value={name} onChange={(e) => setName(e.target.value)} />
//       <input value={desc} onChange={(e) => setDesc(e.target.value)} />
//       <button onClick={postHabit}>Post</button>
//       <div>
//         {habits?.map((habit) => <li key={habit.id}>{habit.name}</li>)}
//       </div >
//     </>
//   )
// }
//
// export default DashboardPage;
//


import { useEffect, useState } from 'react'
import {
  Plus,
  CheckCircle2,
  XCircle,
  CalendarDays,
  BarChart3,
  Trophy,
  Bell,
  Settings,
  User,
} from 'lucide-react'
import WeeklyBarChart from '@/components/WeeklyBarChart'

type Habit = {
  id: number
  name: string
  description: string
  color?: string
  icon?: string
  completedToday?: boolean
}

const sampleHabits: Habit[] = [
  {
    id: 1,
    name: 'Morning Exercise',
    description: '20 min cardio',
    color: '#2563eb',
    icon: '🏃‍♂️',
    completedToday: false,
  },
  {
    id: 2,
    name: 'Meditation',
    description: '10 min mindfulness',
    color: '#0ea5e9',
    icon: '🧘‍♂️',
    completedToday: true,
  },
  {
    id: 3,
    name: 'Reading',
    description: 'Read 15 pages',
    color: '#111827',
    icon: '📚',
    completedToday: false,
  },
]

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>(sampleHabits)
  const [showAddModal, setShowAddModal] = useState(false)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const toggleComplete = (id: number, completed: boolean) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completedToday: completed } : h))
    )
  }
  const addHabit = async () => {
    setHabits((prev) => [...prev, {
      id: habits.length + 1,
      name: "test",
      description: 'Read 15 pages',
      color: '#111827',
      icon: '📚',
      completedToday: false,
    }])
    setShowAddModal(false)
  }


  useEffect(() => {
    const fetchHabits = async () => {
      const res = await fetch("http://localhost:3000/habits")
      const data = await res.json()

      console.log(data.data)
    }
    fetchHabits()
  }, [])

  const postHabit = async () => {
    const res = await fetch("http://localhost:3000/habits", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, description: desc })
    })
    setHabits(prev => [...prev, { name: name, descritpion: desc }])
  }

  // console.log(habits)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      <TopNav onAdd={() => setShowAddModal(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <HeaderGreeting />
        <StatsRow />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodayHabits
              habits={habits}
              onToggle={(id, c) => toggleComplete(id, c)}
            />
            <ProgressSection />
          </div>
          <aside className="space-y-6">
            <StreakCard />
            <RemindersCard />
          </aside>
        </div>
      </main>
      {showAddModal && (
        <AddHabitModal handleSubmit={addHabit} onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}

function TopNav({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-md bg-blue-600 grid place-items-center text-white font-bold">
            HF
          </div>
          <span className="font-semibold text-gray-900">HabitFlow</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Add Habit
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <Settings size={20} className="text-gray-600" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gray-900 grid place-items-center">
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  )
}

function HeaderGreeting() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
        Welcome back, Hamed
      </h1>
      <p className="text-gray-600">{today} • Keep the momentum going!</p>
    </section>
  )
}

function StatsRow() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        title="Current Streak"
        value="7 days"
        icon={<Trophy size={18} />}
        color="from-blue-600 to-blue-500"
      />
      <StatCard
        title="Weekly Completion"
        value="82%"
        icon={<BarChart3 size={18} />}
        color="from-gray-900 to-gray-800"
      />
      <StatCard
        title="Habits Today"
        value="3 / 5"
        icon={<CalendarDays size={18} />}
        color="from-sky-500 to-sky-400"
      />
    </section>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div
        className={`h-1 w-full bg-gradient-to-r ${color}`}
        aria-hidden="true"
      />
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-gray-50 grid place-items-center text-gray-700">
          {icon}
        </div>
      </div>
    </div>
  )
}

function TodayHabits({
  habits,
  onToggle,
}: {
  habits: Habit[]
  onToggle: (id: number, completed: boolean) => void
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Habits</h2>
        <span className="text-sm text-gray-500">{habits.length} habits</span>
      </div>

      <ul className="divide-y divide-gray-100">
        {habits.map((h) => (
          <li key={h.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-xl h-9 w-9 grid place-items-center rounded-md"
                style={{ background: `${h.color}20` }}
                aria-hidden="true"
              >
                {h.icon ?? '✅'}
              </span>
              <div>
                <p className="font-medium text-gray-900">{h.name}</p>
                <p className="text-sm text-gray-500">{h.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggle(h.id, true)}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${h.completedToday
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
                  }`}
              >
                <CheckCircle2 size={18} />
                Done
              </button>
              <button
                onClick={() => onToggle(h.id, false)}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${h.completedToday === false
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
              >
                <XCircle size={18} />
                Skip
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProgressSection() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Progress</h2>
        <div className="flex gap-2">
          <select className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white">
            <option>Week</option>
            <option>Month</option>
            <option>Quarter</option>
          </select>
        </div>
      </div>
      <div className="h-56 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-dashed border-blue-200 grid place-items-center text-blue-700">
        <WeeklyBarChart />
      </div>
    </section>
  )
}

function StreakCard() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Streak</h3>
      <p className="text-gray-600 mb-4">
        Keep your streak alive! You’re on fire.
      </p>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 21 }).map((_, i) => (
          <div
            key={i}
            className={`h-8 rounded-md ${i % 3 === 0
              ? 'bg-blue-600'
              : i % 3 === 1
                ? 'bg-blue-400'
                : 'bg-gray-200'
              }`}
            title={`Day ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

function RemindersCard() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Reminders</h3>
      <div className="space-y-3">
        <ReminderItem time="08:00" text="Morning Exercise" />
        <ReminderItem time="12:30" text="Walk & water" />
        <ReminderItem time="20:00" text="Meditation" />
      </div>
    </section>
  )
}

function ReminderItem({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
      <div>
        <p className="text-sm font-medium text-gray-900">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only" defaultChecked />
        <span className="w-10 h-6 bg-gray-300 rounded-full relative transition">
          <span className="absolute left-0.5 top-0.5 size-5 bg-white rounded-full shadow transition-transform translate-x-0 peer-checked:translate-x-4" />
        </span>
      </label>
    </div>
  )
}

function AddHabitModal({ onClose, handleSubmit }: { onClose: () => void, handleSubmit: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Add Habit</h3>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
        <form
          className="p-4 space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Name
              </label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. Morning Exercise"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Category
              </label>
              <select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option>Wellness</option>
                <option>Fitness</option>
                <option>Productivity</option>
                <option>Learning</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Add some details..."
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" className="rounded" defaultChecked />
              Daily habit
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
