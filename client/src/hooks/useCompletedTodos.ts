
import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async (): Promise<Todo> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/completed`, {
    credentials: "include",
  })
  const data = await response.json();
  return data;
}


export const useCompletedTodos = () => {
  const { data: completedTodos, isFetching, isLoading, isError, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: 1000 * 60 * 5 });

  return { completedTodos, isFetching, isError, isLoading, error };
}
