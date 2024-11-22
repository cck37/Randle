export const fudgeDate = (numberOfDays: number) => {
  let date = new Date();
  date.setDate(date.getDate() + numberOfDays);
  return date.valueOf().toString();
};
