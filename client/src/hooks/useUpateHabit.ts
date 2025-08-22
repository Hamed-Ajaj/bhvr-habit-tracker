import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateHabit = async (habitId: string, completed: boolean) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}habits/${habitId}`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      completed: completed ? 0 : 1
    })
  })

}

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    }
  })
}
