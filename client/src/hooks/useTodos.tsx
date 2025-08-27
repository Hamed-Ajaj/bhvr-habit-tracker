import { fetchTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
interface Todo {
  success: boolean;
  todos: TodoItem[];
}



export const useTodos = () => {
  const { data: todos, isFetching, isLoading, isError, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: Infinity });

  return { todos, isFetching, isError, isLoading, error };
}
