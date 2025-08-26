import { Habit } from "@/components/ui/habit-item";

export const addHabit = async ({ title, description, frequency }: { title: string, description: string, frequency: string }) => {

  const todayDate = new Date();

  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: title.trim(),
      description: description.trim(),
      frequency: frequency.trim(),
      start_date: todayDate.toISOString().split('T')[0], // Use today's date as startDate
    })
  })

  return response.json();
}

export const deleteHabit = async (habitId: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/${habitId}`, {
    method: 'DELETE',
    credentials: "include"
  })

  return response.json();
}


export const fetchHabits = async (): Promise<Habit> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
    credentials: "include"
  });
  const data = await response.json();
  return data;
}

export const updateHabit = async ({ habitId, completed }: { habitId: string, completed: boolean }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/${habitId}/complete`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    // body: JSON.stringify({
    //   completed: completed ? 1 : 0
    // })
  })
}
