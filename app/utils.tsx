"use client";
import { StorageState } from "./types";
import { timestampToDate } from "./api/utils";

export const isValidStorage = (
  storageItem: StorageState,
  categoryTitle: string
): storageItem is StorageState =>
  !!storageItem &&
  timestampToDate(storageItem?.timeStamp).toDateString() ===
    timestampToDate(Date.now()).toDateString() &&
  storageItem.category.title === categoryTitle;
