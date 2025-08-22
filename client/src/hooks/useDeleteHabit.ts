import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteHabit = async (habitId: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits/${habitId}`, {
    method: 'DELETE',
    credentials: "include"
  })

  return response.json();
}

export const useDeleteHabit = () => {
  const qeryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      qeryClient.invalidateQueries({ queryKey: ["habits"] });
    }
  })
}
