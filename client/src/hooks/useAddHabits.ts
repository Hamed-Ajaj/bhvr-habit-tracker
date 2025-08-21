import { useMutation, useQueryClient } from "@tanstack/react-query";

const addHabit = async ({ title, description, frequency }: { title: string, description: string, frequency: string }) => {

  const todayData = new Date();

  const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: title.trim(),
      description: description.trim(),
      frequency: frequency.trim(),
      start_date: todayData.toISOString().split('T')[0], // Use today's date as startDate
    })
  })

  return response.json();
}

// export const useAddHabit = () => {
//   const queryClient = useQueryClient();
//   return useMutation({})
// }

export const useAddHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    }
  })
}
