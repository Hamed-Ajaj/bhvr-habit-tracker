// hooks/useAddTodo.ts
import { addTodo } from "@/api/todos";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,

    onMutate: async (title: string) => {

      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prev = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: any) => ({
        ...old,
        todos: [
          ...(old?.todos ?? []),
          { id: Date.now(), title, completed: false },
        ],
      }));

      return { prev };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["todos"], context?.prev);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
