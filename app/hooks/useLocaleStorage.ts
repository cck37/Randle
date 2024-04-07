import { useState, useEffect } from "react";

const getStorageValue = (key: string): any =>
  typeof window !== "undefined" && localStorage.getItem(key) !== null
    ? JSON.parse(localStorage.getItem(key) ?? "{}")
    : null;

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<any>(() => getStorageValue(key));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
