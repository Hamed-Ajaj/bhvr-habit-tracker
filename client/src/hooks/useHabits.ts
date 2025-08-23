import { useQuery } from "@tanstack/react-query";

interface Habit {
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

const fetchHabits = async (): Promise<Habit> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
    credentials: "include"
  });
  const data = await response.json();
  return data;
}



export const useHabits = () => {
  const { data: habits, isFetching, isError, error, isLoading } = useQuery({ queryKey: ['habits'], queryFn: fetchHabits, staleTime: 1000 * 60 * 5 });
  return { habits, isFetching, isError, error, isLoading }
}
