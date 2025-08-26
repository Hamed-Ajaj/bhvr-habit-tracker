// hooks/useAddTodo.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addTodo = async (title: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.trim(), completed: 0 }),
  });
  return response.json();
};

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
