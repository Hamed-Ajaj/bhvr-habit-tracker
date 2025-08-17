import { useMutation, useQueryClient } from "@tanstack/react-query";

const delteTodo = async (id: number) => {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
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
