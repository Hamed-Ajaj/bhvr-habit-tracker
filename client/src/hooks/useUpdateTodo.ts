import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateTodo = async (id: number, title: string, completed: boolean) => {
  const response = await fetch(`http://localhost:3000/todos/32`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: 1, // ← Toggle completed status
      title: title, // ← Keep the title unchanged
    }),
  });
  return response.json();
}

export const useUpdateTodo = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}
