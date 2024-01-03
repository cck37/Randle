import { cache } from "react";
import { getCategory } from "../category/getCategory";
import { GuessResponse } from "@/app/types";
import prisma from "../db";

export const dynamic = "force-dynamic";

export const getGuessResponse = cache(
  async (guess: string, currDay: number): Promise<GuessResponse> => {
    // Get answer for today
    // DB Call 1
    const currCategory = await getCategory(currDay);

    // DB Call 2
    const answersCount = await prisma.items.count({
      where: {
        category_id: currCategory.id,
      },
    });
    // DB Call 3
    const currAnswer = await prisma.items.findFirst({
      where: {
        category_id: currCategory.id,
      },
      include: {
        itemAttributes: {
          include: {
            attribute: true,
          },
        },
      },
      // FIX: Could be a predictiable rotating schedule of category and answer. Also might break for certain month + number of item combiniations
      // Gotta include more "randomness" into it like use seconds and cache the result when the day changes or consider the day of the week as well
      orderBy: {
        id: "asc",
      },
      skip: currDay % answersCount,
      take: 1,
    });

    // DB Call 4
    const currGuess = await prisma.items.findFirst({
      where: {
        name: {
          equals: guess,
        },
        category_id: currCategory.id,
      },
      include: {
        itemAttributes: {
          include: {
            attribute: true,
          },
        },
      },
    });

    if (currAnswer && currGuess)
      return {
        id: currGuess.id,
        name: currGuess.name,
        data: currGuess.itemAttributes?.map((itemAttributes) => ({
          name: itemAttributes.attribute.name,
          value: itemAttributes.value,
          isCorrect:
            itemAttributes.value ===
            currAnswer.itemAttributes.find(
              (g) => g.attribute.name === itemAttributes.attribute.name
            )?.value, //FIX: Not great; nested loops
        })),
      };
    else {
      //TODO: Handle
      console.error(`Guess: ${guess} was not found in the current category`);
    }
  }
);
