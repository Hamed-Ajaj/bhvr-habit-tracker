import { useHabits } from "@/hooks/useHabits";
import AddHabitDialog from "@/components/ui/add-habit-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useDeleteHabit } from "@/hooks/useDeleteHabit";
import { Trash } from "lucide-react";
import { useState } from "react";
// import { Button } from "@/components/ui/button";
import { useUpdateHabit } from "@/hooks/useUpateHabit";
import HabitItem from "@/components/ui/habit-item";
// import EditHabitDialog from "@/components/ui/edit-habit-dialog";
const HabitsPage = () => {
  const { habits, isFetching } = useHabits();
  console.log(habits);
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div><h1 className="text-3xl font-bold text-gray-900">Habits</h1>
          <p className="text-gray-600">Track your daily and weekly habits</p></div>
        <div>
          <AddHabitDialog />
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {habits && habits?.habits?.length > 0 ? (
          habits?.habits?.map((habit: any) => <HabitItem habit={habit} key={habit.id} />
          )
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
            No habits found. Start by creating one!
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;
