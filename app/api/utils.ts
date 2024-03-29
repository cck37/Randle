export const getRandom = (max: number, timestamp: number): number => {
  const date = timestampToDate(timestamp);
  const seed =
    date.getDate() * 32 + date.getMonth() * 13 + date.getFullYear() * 367;
  return (seed % max) + 1;
};

const timestampToDate = (timestamp: number) =>
  new Date(
    new Date(timestamp).toLocaleString("en-US", {
      timeZone: "America/New_York",
    })
  );
