
import { fetchCompletedTodos } from "@/api/todos";
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



export const useCompletedTodos = () => {
  const { data: completedTodos, isFetching, isLoading, isError, error } = useQuery({ queryKey: ['completed-todos'], queryFn: fetchCompletedTodos, staleTime: Infinity });

  return { completedTodos, isFetching, isError, isLoading, error };
}
