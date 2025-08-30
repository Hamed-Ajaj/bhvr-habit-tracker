import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { formatDate } from "@/lib/utils";
import { fetchCompletedHabits } from "@/api/habits";
import CardSkeleton from "./card-skeleton";

const CompletedHabitsCard = () => {

  const { data: completedHabits, isLoading: isLoadingHabits } = useQuery({
    queryKey: ['completed-habits-count'],
    queryFn: fetchCompletedHabits,
    staleTime: Infinity,
  });

  if (isLoadingHabits) {
    return <CardSkeleton />; // show skeleton until data is ready
  }
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 py-0 border-0 shadow-md hover:scale-105">
      <CardHeader className="py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            🌱
          </div>
          Habits Completed
        </CardTitle>
        <CardDescription className="text-green-100 text-sm">
          {formatDate()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 bg-white">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg mb-4">
          <span className="text-3xl font-bold text-white drop-shadow-sm">
            {isLoadingHabits ? "..." : (completedHabits?.count ?? 3)}
          </span>
        </div>
        <p className="text-sm text-slate-600 text-center">
          {isLoadingHabits
            ? "Loading..."
            : "Building healthy routines"
          }
        </p>
      </CardContent>
    </Card>
  )
}

export default CompletedHabitsCard;
