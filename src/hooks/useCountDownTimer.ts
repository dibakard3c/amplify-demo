import { useTimer } from 'react-timer-hook';
import { addSeconds } from 'date-fns';

export const useCountDownTimer = (
  autoRun: boolean = true,
  totalSeconds: number,
  onComplete?: () => void
  //   duration?: number
) => {
  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp: addSeconds(new Date(), totalSeconds),
    onExpire: () => {
      if (onComplete) {
        onComplete();
      }
      console.warn('onExpire called');
    },
    autoStart: autoRun,
  });

  const resetTimer = (newTotalSeconds?: number) => {
    restart(
      addSeconds(new Date(), newTotalSeconds ? newTotalSeconds : totalSeconds)
    );
  };

  function twoDigits(n: any) {
    return String(Math.abs(Math.trunc(n))).padStart(2, '0');
  }

  return {
    minutes: twoDigits(minutes),
    seconds: twoDigits(seconds),
    secondsLeft: 0,
    startTimer: start,
    resetTimer,
  };
};
