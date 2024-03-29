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
  // Server switches category by day based on EST
  const now = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );
  const midnight = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );
  midnight.setHours(24, 0, 0, 0);
  const timeDifference = midnight.getTime() - now.getTime();
  return timeDifference > 0 ? Math.floor(timeDifference / 1000) : 0; // Convert to seconds
};
