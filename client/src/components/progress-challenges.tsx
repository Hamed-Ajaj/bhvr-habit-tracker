import { useState } from "react";
import { Calendar } from "./ui/calendar";

const ProgressChallenges = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <div className="w-[600px] flex justify-center">
      <Calendar
        navLayout="after"
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border w-full "
      />
    </div>
  )
}

export default ProgressChallenges;
