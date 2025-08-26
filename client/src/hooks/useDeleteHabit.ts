import { deleteHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteHabit = () => {
  const qeryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      qeryClient.invalidateQueries({ queryKey: ["habits"] });
    }
  })
}
