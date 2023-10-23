import { getCategory } from "../category/getCategory";

export const revalidate = 3600; // revalidate the data at most every hour

export async function getGuessResponse(guess: string) {
  // Get answer for today
  const currCategory = getCategory();
  const currDay = new Date().getDate();
  const currAnswerIndex = currDay % currCategory.items.length;
  const currAnswer = currCategory.items[currAnswerIndex];

  // Compare answer to guess
  const guessItem = currCategory.items.find((i) => i.name === guess);

  if (guessItem)
    return {
      name: guess,
      data: guessItem.attributes.map((guessAttributes) => ({
        name: guessAttributes.name,
        value: guessAttributes.value,
        isCorrect:
          guessAttributes.value ===
          currAnswer.attributes.find((g) => g.name === guessAttributes.name)
            ?.value, //FIX: Not great; nested loops
      })),
    };
  else {
    //TODO: Handle
    console.error(`Guess: ${guess} was not found in the current category`);
    return;
  }
}
