import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import {
  checkReviewExists,
  createReview,
  getUserData,
  updateReview,
} from "@/libs/apis";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication Required" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Unable to fetch data" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Authentication Required" },
        { status: 401 }
      );
    }

    const {
      roomId,
      reviewText,
      ratingValue,
    }: { roomId: string; reviewText: string; ratingValue: number } =
      await req.json();

    // Validate required fields
    if (!roomId || !reviewText || typeof ratingValue !== "number") {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    // Check if the review already exists
    const existingReview = await checkReviewExists(userId, roomId);

    let data;
    if (existingReview) {
      // Update existing review
      data = await updateReview({
        reviewId: existingReview._id,
        reviewText,
        userRating: ratingValue,
      });
    } else {
      // Create a new review
      data = await createReview({
        hotelRoomId: roomId,
        reviewText,
        userId,
        userRating: ratingValue,
      });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error("Error processing review:", error);
    return NextResponse.json(
      { error: "Unable to process review" },
      { status: 400 }
    );
  }
}
