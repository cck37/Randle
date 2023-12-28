import { type NextRequest, NextResponse } from "next/server";
import { getGuessResponse } from "./getGuessResponse";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const guess = searchParams.get("guess") ?? "";
  const date = parseInt(searchParams.get("date") ?? "1");
  const data = getGuessResponse(guess, date);

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
