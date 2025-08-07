import { useEffect, useState } from 'react';

export const useCountDownTimer = (
  autoRun: boolean = true,
  totalSeconds: number,
  onComplete?: () => void,
  duration?: number
) => {
  const [initialDuration] = useState(totalSeconds || 0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds || 0);
  const [isRunning, setIsRunning] = useState(autoRun);

  const resetTimer = () => {
    setSecondsLeft(initialDuration);
  };

  const startTimer = () => {
    resetTimer();
    setIsRunning(true);
  };

  useEffect(() => {
    let intervalId: any;
    if (isRunning && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((secondsLeftValue) => {
          if (secondsLeftValue <= 1) {
            clearInterval(intervalId);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return secondsLeftValue - 1;
        });
      }, duration || 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [duration, isRunning, onComplete, secondsLeft, totalSeconds]);

  return {
    minutes: `${Math.floor(secondsLeft / 60)}`,
    seconds: `${secondsLeft % 60 < 10 ? '0' : ''}${secondsLeft % 60}`,
    secondsLeft,
    startTimer,
    resetTimer,
    isComplete: secondsLeft % 60 === 0,
  };
};
