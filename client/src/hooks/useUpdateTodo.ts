import { updateTodo } from "@/api/todos";
import { Todo } from "@/pages/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodo = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ["todos", updated.id] });
      const prev = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: any) => ({
        ...old,
        todos: old.todos.map((t: Todo) =>
          t.id === updated.id ? { ...t, ...updated } : t
        ),
      }));

      return { prev };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["todos"], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["completed-todos"] })
    },
  });
}
