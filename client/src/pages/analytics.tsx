import { lazy, Suspense } from "react";
import CardSkeleton from "@/components/ui/card-skeleton";
import { useQuery } from "@tanstack/react-query";

const CompletedTodosCard = lazy(() => import("@/components/ui/completed-todos-card"));
const CompletedHabitsCard = lazy(() => import("@/components/ui/completed-habits-card"));
const CompletedFocusCard = lazy(() => import("@/components/ui/completed-focus-card"));

const Analytics = () => {

  // const focusSessionsToday = 5; // Replace with actual data later

  return (
    <main className="min-h-screen bg-gradient-to-br  p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600">Track your daily progress and achievements</p>
        </div>

        {/* Cards section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Completed Todos Card */}
          <Suspense fallback={<CardSkeleton />}>
            <CompletedTodosCard />
          </Suspense>
          {/* Habits Card */}
          <Suspense fallback={<CardSkeleton />}>
            <CompletedHabitsCard />
          </Suspense>
          {/* Focus Sessions Card */}
          <Suspense fallback={<CardSkeleton />}>
            <CompletedFocusCard />
          </Suspense>
        </section>

        {/* Additional stats section - can be expanded later */}
        {/* <section className="bg-white rounded-xl shadow-md p-6"> */}
        {/*   <h2 className="text-xl font-semibold text-slate-800 mb-4">Weekly Overview</h2> */}
        {/*   <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
        {/*     <div className="text-center p-4 bg-slate-50 rounded-lg"> */}
        {/*       <div className="text-2xl font-bold text-blue-600 mb-1"> */}
        {/*         {/* TODO: fetch weekly todos count */}
        {/*         25 */}
        {/*       </div> */}
        {/*       <p className="text-sm text-slate-600">Todos This Week</p> */}
        {/*     </div> */}
        {/*     <div className="text-center p-4 bg-slate-50 rounded-lg"> */}
        {/*       <div className="text-2xl font-bold text-green-600 mb-1">21</div> */}
        {/*       <p className="text-sm text-slate-600">Habits This Week</p> */}
        {/*     </div> */}
        {/*     <div className="text-center p-4 bg-slate-50 rounded-lg"> */}
        {/*       <div className="text-2xl font-bold text-purple-600 mb-1"> */}
        {/*         {focusSessionsToday?.focusSessions?.length * 7} */}
        {/*       </div> */}
        {/*       <p className="text-sm text-slate-600">Focus Sessions This Week</p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </section> */}
      </div>
    </main>
  )
}

export default Analytics;
