import { addHabit } from "@/api/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useAddHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addHabit,
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["habits"] }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["habits"] }) }
  });
}
