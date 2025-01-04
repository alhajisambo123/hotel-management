import Stripe from "stripe";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { getRoom } from "@/libs/apis";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia", // Ensure this version is correct for your use case
});

type RequestData = {
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request) {
  // Parse the incoming JSON body to extract the necessary parameters
  const {
    checkinDate,
    adults,
    checkoutDate,
    children,
    hotelRoomSlug,
    numberOfDays,
  }: RequestData = await req.json();

  // Validate the required fields
  if (
    !checkinDate ||
    !checkoutDate ||
    !adults ||
    !hotelRoomSlug ||
    !numberOfDays
  ) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  // Get the origin header from the request
  const origin = req.headers.get("origin");

  // Get the current session to ensure the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication required", { status: 400 });
  }

  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split("T")[0];
  const formattedCheckinDate = checkinDate.split("T")[0];

  try {
    // Fetch the room details using the provided hotelRoomSlug
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // Create a Stripe payment session
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()), // Convert to cents
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`, // Redirect URL after successful payment
      metadata: {
        adults,
        checkinDate: formattedCheckinDate,
        checkoutDate: formattedCheckoutDate,
        children,
        hotelRoom: room._id,
        numberOfDays,
        user: userId,
        discount: room.discount,
        totalPrice,
      },
    });

    // Return the Stripe session details as a JSON response
    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (error: unknown) {
    // Handle any errors during the payment session creation
    console.error("Payment failed", error);
    return new NextResponse("Payment session creation failed", { status: 500 });
  }
}
