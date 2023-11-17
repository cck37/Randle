import { type NextRequest, NextResponse } from "next/server";
import { getGuessResponse } from "./getGuessResponse";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guess = searchParams.get("guess") ?? "";
  const data = getGuessResponse(guess, new Date().getDate());

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
