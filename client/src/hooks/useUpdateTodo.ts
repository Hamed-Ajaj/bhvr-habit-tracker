import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateTodo = async ({
  id,
  title,
  completed,
}: {
  id: number;
  title: string;
  completed: boolean;
}) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: completed ? 1 : 0, // Toggle completed status
      title: title, // Use the passed title
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const useUpdateTodo = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error updating todo:", error);
    },
  });
}
