import { useCompletedTodos } from "@/hooks/useCompletedTodos";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { formatDate } from "@/lib/utils";
import CardSkeleton from "./card-skeleton";

const CompletedTodosCard = () => {
  const { completedTodos, isLoading } = useCompletedTodos();
  if (isLoading) {
    return <CardSkeleton />; // show skeleton until data is ready
  }
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 py-0 border-0 shadow-md hover:scale-105">
      <CardHeader className="py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            ✓
          </div>
          Completed Todos
        </CardTitle>
        <CardDescription className="text-blue-100 text-sm">
          {formatDate()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 bg-white">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mb-4">
          <span className="text-3xl font-bold text-white drop-shadow-sm">
            {completedTodos?.completed?.length ?? 0}
          </span>
        </div>
        <p className="text-sm text-slate-600 text-center">
          {completedTodos?.completed?.length === 0
            ? "No todos completed yet"
            : `Great progress today!`
          }
        </p>
      </CardContent>
    </Card>
  )
}

export default CompletedTodosCard;
