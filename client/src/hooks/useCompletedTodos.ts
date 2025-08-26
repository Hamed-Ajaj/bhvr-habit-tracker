
import { useQuery } from "@tanstack/react-query";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

interface completedTodos {
  success: boolean;
  completed: TodoItem[];
}

const fetchTodos = async (): Promise<completedTodos> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/completed`, {
    credentials: "include",
  })
  const data = await response.json();
  return data;
}


export const useCompletedTodos = () => {
  const { data: completedTodos, isFetching, isLoading, isError, error } = useQuery({ queryKey: ['completed-todos'], queryFn: fetchTodos, staleTime: Infinity });

  return { completedTodos, isFetching, isError, isLoading, error };
}
