"use client";
import { StorageState } from "./types";
import { timestampToDate } from "./api/utils";

const PAR_RATE = 0.05;

export const isValidStorage = (
  storageItem: StorageState,
  categoryTitle: string
): storageItem is StorageState =>
  !!storageItem &&
  timestampToDate(storageItem?.timeStamp).toDateString() ===
    timestampToDate(Date.now()).toDateString() &&
  storageItem.category.title === categoryTitle;

export const getPar = (categoryLength: number) =>
  Math.floor(categoryLength * PAR_RATE);
