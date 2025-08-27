import { fetchHabits } from "@/api/habits";
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



export const useHabits = () => {
  const { data: habits, isFetching, isError, error, isLoading } = useQuery({ queryKey: ['habits'], queryFn: fetchHabits, staleTime: 1000 * 60 * 5 });
  return { habits, isFetching, isError, error, isLoading }
}
