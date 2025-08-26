import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import { useCompletedTodos } from "@/hooks/useCompletedTodos";

const Analytics = () => {
  const { completedTodos, isLoading } = useCompletedTodos();

  if (isLoading) return <Loader />;
  console.log(completedTodos);
  return (

    // TODO:  we need three cards one for completed todos, one for habits and one for focus sessions only for today
    <main className="max-w-6xl mx-auto p-6 bg-white">
      {/* <h1>completedTodos : {completedTodos?.completed?.length}</h1> */}
      {/*cards section*/}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <Card className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Today’s Completed Todos
            </CardTitle>
            <CardDescription className="mt-1 text-xs text-slate-500">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex items-center justify-center p-4">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
              <span className="text-4xl font-bold text-white drop-shadow">
                {completedTodos?.completed?.length ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>habits card</Card>
        <Card>focus card</Card>
      </section>
    </main>
  )
}

export default Analytics;
