import { Todo } from "@/pages/todo";
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
    credentials: "include",
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
