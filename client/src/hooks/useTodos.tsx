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

const fetchTodos = async (): Promise<Todo> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
    credentials: "include",
  })
  const data = await response.json();
  return data;
}


export const useTodos = () => {
  const { data: todos, isFetching, isLoading, isError, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos, staleTime: Infinity });

  return { todos, isFetching, isError, isLoading, error };
}
