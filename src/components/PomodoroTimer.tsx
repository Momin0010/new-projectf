import React, { useState, useEffect } from 'react';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<Mode>('work');
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  const modeDurations = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const modeColors = {
    work: 'bg-red-500',
    shortBreak: 'bg-blue-500',
    longBreak: 'bg-green-500',
  };

  useEffect(() => {
    setTime(modeDurations[mode]);
    setIsActive(false); // Reset timer state when mode changes
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      // Optionally, add a notification or auto-switch mode here
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
  };

  const handleStartReset = () => {
    if (isActive) {
      setIsActive(false); // Pause
    } else {
      setIsActive(true); // Start
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(modeDurations[mode]);
  };

  return (
    <div className={`flex items-center justify-center min-h-screen w-full transition-colors duration-500 ${modeColors[mode]}`}>
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg text-white">
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              mode === 'work' ? 'bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => handleModeChange('work')}
          >
            Work
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              mode === 'shortBreak' ? 'bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => handleModeChange('shortBreak')}
          >
            Short Break
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              mode === 'longBreak' ? 'bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
            onClick={() => handleModeChange('longBreak')}
          >
            Long Break
          </button>
        </div>
        <div className="text-8xl font-bold text-center mb-6">
          {formatTime(time)}
        </div>
        <div className="flex justify-around">
          <button
            className="px-8 py-3 rounded-md text-xl font-semibold bg-white text-gray-800 hover:bg-gray-100"
            onClick={handleStartReset}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            className="px-8 py-3 rounded-md text-xl font-semibold bg-white text-gray-800 hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
