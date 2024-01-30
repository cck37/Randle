import { type NextRequest, NextResponse } from "next/server";
import { getGuessResponse } from "./getGuessResponse";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guess = searchParams.get("guess") ?? "";
  const date = new Date(searchParams.get("date") ?? new Date().toString());
  const data = await getGuessResponse(guess, date);

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
