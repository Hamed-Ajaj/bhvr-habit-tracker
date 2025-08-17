import { useMutation, useQueryClient } from "@tanstack/react-query";

const addTodo = async (title: string) => {

  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.trim(), // ← Use "title" not "text"
      completed: 0, // ← Default to false
    }),
  });

  return response.json();
}

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

}

