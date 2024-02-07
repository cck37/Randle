import { type NextRequest, NextResponse } from "next/server";
import { getGuessResponse } from "./getGuessResponse";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guess = searchParams.get("guess");
  const dateString = searchParams.get("date");

  if (guess && guess.length <= 0)
    return NextResponse.json(
      {
        error: "No guess provided",
      },
      {
        status: 400,
      }
    );
  if (dateString && dateString.length <= 0)
    return NextResponse.json(
      {
        error: "No date provided",
      },
      {
        status: 400,
      }
    );

  const date = new Date(dateString ?? new Date());
  const data = await getGuessResponse(guess ?? "", date);

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
