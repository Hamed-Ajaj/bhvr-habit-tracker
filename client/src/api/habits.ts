

export interface HabitRes {
  success: boolean;
  habits: {
    id: number;
    name: string;
    completed: boolean;
    startDate: string;
    description: string;
    frequency: string;
  }[]
}

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

export const fetchHabits = async (): Promise<HabitRes> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
    credentials: "include"
  });
  const data = await response.json();
  return data;
}

export const updateHabit = async ({ habitId }: { habitId: string }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/${habitId}/complete`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  })
  return response.json();
}

export const fetchCompletedHabits = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/completed/count`, {
    credentials: "include",
  })
  const data = await response.json();
  return data;
}
