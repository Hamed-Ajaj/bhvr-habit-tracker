import { CheckCircle, Target } from "lucide-react";
import { useState } from "react";

const OverViewChallenges = () => {

  const [joinedChallenge, setJoinedChallenge] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([false, false, false, false]);
  const challenges = [
    {
      id: 1,
      text: "Complete at least 5 tasks from your to-do list every day",
      icon: <Target className="w-5 h-5" />,
      completed: completedTasks[0]
    }];

  const toggleTask = (index: number) => {
    const newCompletedTasks = [...completedTasks];
    newCompletedTasks[index] = !newCompletedTasks[index];
    setCompletedTasks(newCompletedTasks);
  };

  // const completedCount = completedTasks.filter(task => task).length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{new Date().toLocaleString('default', { month: 'long' })} 2025 Challenge</h2>
            <p className="text-blue-100">
              Transform your daily routine with these productivity-focused goals
            </p>
          </div>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-6 text-lg">
          Focus on improving your daily routine by completing these productivity challenges:
        </p>

        {/* Challenge List */}
        <div className="space-y-4 mb-8">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${challenge.completed
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              onClick={() => joinedChallenge && toggleTask(index)}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${challenge.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-blue-500'
                }`}>
                {challenge.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  challenge.icon
                )}
              </div>
              <span className={`flex-1 text-lg ${challenge.completed ? 'line-through' : ''
                }`}>
                {challenge.text}
              </span>
              {joinedChallenge && (
                <span className="text-sm text-gray-500">
                  {challenge.completed ? 'Completed' : 'Click to complete'}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          {!joinedChallenge ? (
            <button
              onClick={() => setJoinedChallenge(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join Challenge
            </button>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 font-semibold py-2 px-6 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                Challenge Joined!
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Click on tasks above to mark them as completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverViewChallenges;
