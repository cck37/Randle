import { useState, useEffect } from "react";

const getStorageValue = (key: string, defaultValue: any): any =>
  typeof window !== "undefined" && localStorage.getItem(key) !== null
    ? JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue))
    : defaultValue;

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState<any>(() =>
    getStorageValue(key, defaultValue)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
