import { type NextRequest, NextResponse } from "next/server";
import { getGuessResponse } from "./getGuessResponse";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guess = searchParams.get("guess") ?? "";
  const timestamp = Number(searchParams.get("date"));
  const category = searchParams.get("category");

  if (guess && guess.length <= 0)
    return NextResponse.json(
      {
        error: "No guess provided",
      },
      {
        status: 400,
      }
    );

  if (timestamp < 0 || Number.isNaN(timestamp))
    return NextResponse.json(
      {
        error: "No date provided",
      },
      {
        status: 400,
      }
    );

  const data = category
    ? await getGuessResponse(guess, timestamp, category)
    : await getGuessResponse(guess, timestamp);

  if (data) {
    // B/c ts claims Response.json(data) doesn't exist
    return NextResponse.json(data);
  } else {
    return NextResponse.json(
      // lmao that has to be the only error obviously
      // FIX
      { error: `Guess: ${guess} was not found in the current category` },
      {
        status: 400,
      }
    );
  }
}
