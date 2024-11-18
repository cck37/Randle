"use client";
import { CategoryResponse, StorageState } from "./types";
import { timestampToDate } from "./api/utils";

const PAR_RATE = 0.05;

export const isValidStorage = (
  storageItem: StorageState,
  category: CategoryResponse
): storageItem is StorageState =>
  !!storageItem &&
  timestampToDate(storageItem?.timeStamp).toDateString() ===
    timestampToDate(Date.now()).toDateString() &&
  JSON.stringify(storageItem.category) === JSON.stringify(category);

export const getPar = (categoryLength: number) =>
  Math.floor(categoryLength * PAR_RATE);
