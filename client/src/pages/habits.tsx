import { useHabits } from "@/hooks/useHabits";
import AddHabitDialog from "@/components/ui/add-habit-dialog";
import HabitItem from "@/components/ui/habit-item";
const HabitsPage = () => {
  const { habits, isFetching, isLoading} = useHabits();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-2 text-blue-600">
          <svg
            className="animate-spin h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="font-medium">Loading...</span>
        </div>
      </div>
    );

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
