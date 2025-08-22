import { useMutation, useQueryClient } from "@tanstack/react-query";

const editTitle = async ({ id, title, completed }: { id: number, title: string, completed: boolean }) => {

  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: completed,
      title: title, // Use the passed title
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}

export const useEditTitle = () => {


  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error updating title:", error);
    },
  });
}
