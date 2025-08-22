import { useMutation, useQueryClient } from "@tanstack/react-query";

const delteTodo = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: "DELETE",
    credentials: "include"
  })
  return response.json();
}

export const useDeleteTodo = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: delteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
  })
}
