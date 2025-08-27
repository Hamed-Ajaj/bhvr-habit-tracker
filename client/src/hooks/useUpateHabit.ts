import { useMutation, useQueryClient } from "@tanstack/react-query";

const updateHabit = async ({ habitId, completed }: { habitId: string, completed: boolean }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/${habitId}/complete`, {
    method: 'POST',
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    // body: JSON.stringify({
    //   completed: completed ? 1 : 0
    // })
  })

  return response.json();
}

export const useUpdateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
      queryClient.invalidateQueries({ queryKey: ['completed-habits-count'] });
    }
  })
}
