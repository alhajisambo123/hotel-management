import { getRoomReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await the resolution of params
    const resolvedParams = await context.params;
    const { id: roomId } = resolvedParams; // Destructure the ID from the resolved params

    if (!roomId) {
      return new NextResponse("Room ID is required", { status: 400 });
    }

    // Fetch room reviews using the roomId
    const roomReviews = await getRoomReviews(roomId);

    // Return the JSON response
    return NextResponse.json(roomReviews, {
      status: 200,
      statusText: "Successful",
    });
  } catch (error) {
    console.error("Getting Review Failed", error);

    // Return an error response
    return new NextResponse("Unable to fetch reviews", { status: 500 });
  }
}
