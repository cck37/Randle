import { useEffect, useState } from "react";

export const useCountdownToMidnight = () => {
  const [timeUntilMidnight, setTimeUntilMidnight] = useState(
    calculateTimeUntilMidnight()
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeUntilMidnight(calculateTimeUntilMidnight());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return timeUntilMidnight;
};

const calculateTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const timeDifference = midnight.getTime() - now.getTime();
  return timeDifference > 0 ? Math.floor(timeDifference / 1000) : 0; // Convert to seconds
};
