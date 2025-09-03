import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';

const FocusPage = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsCompleted(true);
          setIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isCompleted]);

  const toggleTimer = () => {
    if (isCompleted) {
      resetTimer();
    } else {
      setIsActive(!isActive);
    }
  };

  const resetTimer = () => {
    setMinutes(25);
    setSeconds(0);
    setIsActive(false);
    setIsCompleted(false);
  };

  const handleRecord = async () => {
    const focusedTime = 25 * 60 - (minutes * 60 + seconds);

    setIsActive(!isActive);
    resetTimer();

    try {
      const newSession = await fetch(`${import.meta.env.VITE_API_URL}/focus`, {
        method: 'POST',
        credentials: "include",

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration: focusedTime }),
      })
    }
    catch (error) {
      console.error("Error recording focus session:", error);
    }
  }

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full  p-8">
      <div className="relative w-80 h-80 flex justify-center items-center flex-col rounded-full bg-white shadow-2xl border-8 border-green-200 transition-all duration-300 hover:shadow-3xl">
        {/* Progress Ring */}
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#dcfce7"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="transition-all duration-1000 ease-in-out"
            strokeLinecap="round"
          />
        </svg>

        {/* Timer Content */}
        <div className="z-10 flex flex-col items-center space-y-4">
          <h1 className="font-bold text-3xl text-green-800 mb-2">Focus</h1>

          <div className={`text-5xl font-mono font-bold transition-colors duration-300 ${isCompleted ? 'text-red-600' : isActive ? 'text-green-600' : 'text-gray-600'
            }`}>
            {formatTime(minutes, seconds)}
          </div>

          {isCompleted && (
            <div className="text-green-600 font-semibold animate-pulse">
              Time's up! Great work! 🎉
            </div>
          )}

          <div className="flex space-x-3 mt-4">
            <button
              onClick={toggleTimer}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${isCompleted
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : isActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
                } shadow-lg`}
            >
              {isCompleted ? (
                <RotateCcw size={20} />
              ) : isActive ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-0.5" />
              )}
            </button>

            <button
              onClick={resetTimer}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              <RotateCcw size={20} />
            </button>

            {isActive && (
              <button
                onClick={handleRecord}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                <Square size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-lg font-medium">
          {isActive ? "Stay focused!" : isCompleted ? "Take a break!" : "Ready to focus?"}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Pomodoro Timer - 25 minutes of focused work
        </p>
      </div>
    </main>
  );
};

export default FocusPage;
