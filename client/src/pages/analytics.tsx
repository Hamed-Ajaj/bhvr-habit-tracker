import { useCompletedTodos } from "@/hooks/useCompletedTodos";

const Analytics = () => {
  const { completedTodos } = useCompletedTodos();
  console.log(completedTodos);
  return (
    <div>Analytics</div>
  )
}

export default Analytics;
