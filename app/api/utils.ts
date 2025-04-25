export const getRandom = (max: number, timestamp: number): number => {
  const date = timestampToDate(timestamp);
  // HACK: Goal of this is to generate a "random" hash
  // Tries to avoid runs of the same number for several days
  // Better approach might be to generate an array of random numbers and choose based on the day
  const seed = Math.round(
    Math.sqrt(
      (date.getDate() + date.getMonth() + date.getFullYear()) *
        (date.getDate() * 6827)
    )
  );
  return seed % max;
};

export const timestampToDate = (timestamp: number) =>
  new Date(
    new Date(timestamp).toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );
