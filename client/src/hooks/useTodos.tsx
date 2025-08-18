import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async (): Promise<Todo> => {
  const response = await fetch('http://localhost:3000/todos');
  const data = await response.json();
  return data;
}


export const useTodos = () => {
  const { data: todos, isFetching, isLoading, isError, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });

  return { todos, isFetching, isError, isLoading, error };
}
