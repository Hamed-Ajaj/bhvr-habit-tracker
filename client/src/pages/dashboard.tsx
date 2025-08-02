import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [habits, setHabits] = useState('')
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  useEffect(() => {
    const fetchHabits = async () => {
      const res = await fetch("http://localhost:3000/habits")
      const data = await res.json()

      setHabits(data.data)
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

  console.log(habits)
  return (
    <>
      <div>DashboardPage</div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={desc} onChange={(e) => setDesc(e.target.value)} />
      <button onClick={postHabit}>Post</button>
      <div>
        {habits?.map((habit) => <li key={habit.id}>{habit.name}</li>)}
      </div >
    </>
  )
}

export default DashboardPage;
