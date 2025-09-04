import { useHabits } from "@/hooks/useHabits";
import AddHabitDialog from "@/components/ui/add-habit-dialog";
import HabitItem from "@/components/ui/habit-item";
import Loader from "@/components/ui/loader";
const HabitsPage = () => {
  const { habits, isLoading } = useHabits();

  if (isLoading)
    return (
      <Loader />
    );

  return (
    <div className="max-w-3xl md:mx-auto md:p-6">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-3xl font-bold text-gray-900">Habits</h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-[200px]">Track your daily and weekly habits</p></div>
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
