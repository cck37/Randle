import { type NextRequest, NextResponse } from "next/server";
import { getCategory } from "../category/route";

async function getGuessResponse(guess: string) {
  // Get answer for today
  const currCategory = await getCategory();
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
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guess = searchParams.get("guess") ?? "";
  const data = await getGuessResponse(guess);

  if (data) {
    // B/c ts claims Response.json(data) doesn't exist
    return NextResponse.json(data);
  } else {
    return NextResponse.json(
      { error: `Guess: ${guess} was not found in the current category` },
      {
        status: 400,
      }
    );
  }
}
