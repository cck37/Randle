import { cache } from "react";
import { getCategory } from "../category/getCategory";
import { CorrectResponse, GuessResponse } from "@/app/types";
import prisma from "../db";

const toCorrectResponse = (
  guessItemAttribute: any,
  correctItemAttribute: any
): CorrectResponse => {
  if (!correctItemAttribute) {
    //TODO: Handle
    console.error(
      `Item Attribute: ${guessItemAttribute.attribute.name} was not found for the current answer`
    );
    return {
      isCorrect: false,
    };
  }
  const attrType = guessItemAttribute.attribute.attributeType;
  const isCorrect = guessItemAttribute.value === correctItemAttribute.value;
  switch (attrType) {
    case "number":
      return {
        isCorrect,
        isAbove:
          Number(guessItemAttribute.value.replace("$", "")) >
          Number(correctItemAttribute.value.replace("$", "")),
      };
    case "multipart":
      return {
        isCorrect,
        isPartial: guessItemAttribute.value
          .split(",")
          .filter(Boolean)
          .some((partialGuess: any) =>
            correctItemAttribute.value
              .split(",")
              .filter(Boolean)
              .some((partialCorrect: any) => partialCorrect === partialGuess)
          ),
      };
    default:
      return {
        isCorrect,
      };
  }
};

// Like would be nice to generate a random number per day instead of using dumbass modulo
const getRandom = (max: number, min: number = 0): number =>
  Math.random() * (max - min) + min;

export const dynamic = "force-dynamic";

// TODO: Fix stupid cache by day. The only reason why I'm doing this is so Next stops caching this response
// I could give a shit about recompiling; just return me a new result each day instead of deciding what's "fastest"
export const getGuessResponse = cache(
  async (guess: string, currDay: number): Promise<GuessResponse> => {
    // TODO: Stop calling the DB like it's your mother

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

    if (currAnswer && currGuess) {
      return {
        id: currGuess.id,
        name: currGuess.name,
        data: currGuess.itemAttributes?.map((itemAttributes) => ({
          name: itemAttributes.attribute.name,
          attributeType: itemAttributes.attribute.attributeType,
          value: itemAttributes.value,
          res: toCorrectResponse(
            itemAttributes,
            currAnswer.itemAttributes.find(
              (g) => g.attribute_id === itemAttributes.attribute_id
            )
          ),
        })),
      };
    } else {
      //TODO: Handle
      console.error(`Guess: ${guess} was not found in the current category`);
    }
  }
);
