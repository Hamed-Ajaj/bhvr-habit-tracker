import { useHabits } from "@/hooks/useHabits";
import AddHabitDialog from "@/components/ui/add-habit-dialog";
import { Checkbox } from "@/components/ui/checkbox";
const HabitsPage = () => {
  const { habits } = useHabits();

  console.log("Habits data:", habits);
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
          habits?.habits?.map((habit: any) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              {/* Left side: Habit info */}
              <div className="flex items-center gap-4">
                {/* {habit.completed ? ( */}
                {/*   <CheckCircle2 className="w-6 h-6 text-green-500" /> */}
                {/* ) : ( */}
                {/*   <Circle className="w-6 h-6 text-gray-400" /> */}
                {/* )} */}
                <Checkbox checked={!!habit.completed} />
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
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {habit.frequency}
              </span>
            </div>
          ))
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
