import { Todo } from "@/pages/todo";
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
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prev = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: any) => ({
        ...old,
        todos: old.todos.filter((t: Todo) => t.id !== id),
      }));

      return { prev };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["todos"], context?.prev);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  })
}
