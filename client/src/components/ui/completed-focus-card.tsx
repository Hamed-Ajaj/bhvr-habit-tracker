import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { useQuery } from "@tanstack/react-query";
import { fetchFocusSessionsToday } from "@/api/focus-sessions";

const CompletedFocusCard = () => {

  const { data: focusSessionsToday } = useQuery({ queryKey: ['focusSessionsToday'], queryFn: fetchFocusSessionsToday });

  const totalFocusTime = 125; // Total minutes, replace with actual data later

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 py-0 border-0 shadow-md hover:scale-105">
      <CardHeader className="py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-t-lg">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            🎯
          </div>
          Focus Sessions
        </CardTitle>
        <CardDescription className="text-purple-100 text-sm">
          {formatDate()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center p-6 bg-white">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg mb-4">
          <span className="text-3xl font-bold text-white drop-shadow-sm">
            {focusSessionsToday?.focusSessions?.length || 0}
          </span>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600 mb-1">
            {totalFocusTime} minutes focused
          </p>
          <p className="text-xs text-slate-500">
            Keep up the concentration!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompletedFocusCard;
