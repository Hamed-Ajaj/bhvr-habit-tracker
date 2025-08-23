import { useDeleteHabit } from "@/hooks/useDeleteHabit";
import { Checkbox } from "./checkbox";
import { useUpdateHabit } from "@/hooks/useUpateHabit";
import { Trash } from "lucide-react";

export interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: string;
  completed: boolean;
  startDate: string;
}
const HabitItem = ({ habit }: { habit: Habit }) => {

  const deleteHabit = useDeleteHabit();
  const updateHabit = useUpdateHabit()

  const handleCheckboxChange = async (habitId: string, completed: boolean) => {
    try {
      const updatedHabit = await updateHabit.mutateAsync({ habitId: habitId, completed: !completed });
      return updatedHabit;
    }
    catch (error) {
      console.error("Error updating habit:", error);
    }
  }
  return (
    <div
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <Checkbox checked={!!habit.completed} onClick={() => handleCheckboxChange(habit.id, habit.completed)} className="rounded-full text-white accent-blue-600 w-6 h-6 cursor-pointer" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {habit.name}
          </h2>
          <p className="text-sm text-gray-500">
            {habit.description}
          </p>
        </div>
      </div>
      {/* Right side: Frequency */}
      <div className="flex gap-4 items-center"><span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
        {habit.frequency}
      </span>
        <Trash onClick={() => deleteHabit.mutate(habit.id)} className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" /></div>
    </div>
  )
}

export default HabitItem;
