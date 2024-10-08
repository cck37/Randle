import { cache } from "react";
import { getCategory } from "../category/getCategory";
import { CorrectResponse, GuessResponse } from "@/app/types";
import prisma from "../db";
import { getRandom } from "../utils";

export const dynamic = "force-dynamic";

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
    case "date":
      return {
        isCorrect,
        isAbove:
          new Date(Number(correctItemAttribute.value)) >
          new Date(Number(guessItemAttribute.value)),
      };
    case "number":
      return {
        isCorrect,
        isAbove:
          Number(correctItemAttribute.value.replaceAll(/(\$|,)/g, "")) >
          Number(guessItemAttribute.value.replaceAll(/(\$|,)/g, "")),
      };
    case "multipart":
      return {
        isCorrect,
        isPartial: guessItemAttribute.value
          .split(",")
          .map((parital: any) => parital.trim())
          .filter(Boolean)
          .some((partialGuess: string) =>
            correctItemAttribute.value
              .split(",")
              .map((parital: string) => parital.trim())
              .filter(Boolean)
              .includes(partialGuess)
          ),
      };
    default:
      return {
        isCorrect,
      };
  }
};

// TODO: Fix stupid cache by day. The only reason why I'm doing this is so Next stops caching this response
// I could give a shit about recompiling; just return me a new result each day instead of deciding what's "fastest"
export const getGuessResponse = cache(
  async (
    guess: string,
    currTimestamp: number,
    category?: string
  ): Promise<GuessResponse> => {
    // TODO: Stop calling the DB like it's your mother

    // Get answer for today
    // DB Call 1
    const currCategory = await getCategory(currTimestamp, category); // stupid. figure out caching

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
      orderBy: {
        id: "asc",
      },
      skip: getRandom(answersCount - 1, currTimestamp),
      take: 1,
    });

    if (currAnswer == null) {
      //TODO: Handle
      console.error(
        `Guess: Get random returned a value of ${getRandom(
          answersCount - 1,
          currTimestamp
        )} and we found no items that matched that. Something is terribly wrong here`
      );
      return;
    }

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

    if (currGuess == null) {
      //TODO: Handle
      console.error(`Guess: ${guess} was not found in the current category`);
      return;
    }
    console.log(JSON.stringify(currAnswer, null, 2));

    if (currAnswer && currGuess) {
      return {
        id: currGuess.id,
        name: currGuess.name,
        data: currGuess.itemAttributes?.map((itemAttributes) => ({
          id: itemAttributes.id,
          attributeId: itemAttributes.attribute_id,
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
