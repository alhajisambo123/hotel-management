// import { NextResponse, NextRequest } from "next/server";
// import Stripe from "stripe";
// import { createBooking, updateHotelRoom } from "@/libs/apis";
// import { authOptions } from "@/libs/auth";

// import { getServerSession } from "next-auth";
// // Define the Stripe event type
// const checkout_session_completed = "checkout.session.completed";

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-12-18.acacia",
// });

// export async function POST(req: NextRequest) {
//   const reqBody = await req.text();
//   const sig = req.headers.get("stripe-signature");
//   const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
//   const session = await getServerSession(authOptions);

//   let event: Stripe.Event;

//   // Check for missing signature or webhook secret
//   try {
//     if (!sig || !webhookSecret) {
//       return new NextResponse("Missing signature or webhook secret", {
//         status: 400,
//       });
//     }
//     event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
//   } catch (error: any) {
//     return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
//   }

//   // Process the event based on its type
//   switch (event.type) {
//     case checkout_session_completed:
//       const session = event.data.object as Stripe.Checkout.Session;

//       // Extract metadata from the session object
//       const metadata = session.metadata;

//       // Check if metadata exists and destructure safely
//       if (!metadata) {
//         return new NextResponse("Missing metadata", { status: 400 });
//       }

//       const {
//         adults,
//         checkinDate,
//         checkoutDate,
//         children,
//         hotelRoom,
//         numberOfDays,
//         user,
//         discount,
//         totalPrice,
//       } = metadata;

//       // Ensure that all metadata exists
//       if (
//         !adults ||
//         !checkinDate ||
//         !checkoutDate ||
//         !children ||
//         !hotelRoom ||
//         !numberOfDays ||
//         !user ||
//         !discount ||
//         !totalPrice
//       ) {
//         return new NextResponse("Missing necessary metadata", { status: 400 });
//       }

//       // Destructure the metadata properties

//       {
//       }

//       try {
//         // Create the booking using the metadata values
//         await createBooking({
//           adults: Number(adults),
//           checkinDate,
//           checkoutDate,
//           children: Number(children),
//           hotelRoom,
//           numberOfDays: Number(numberOfDays),
//           discount: Number(discount),
//           totalPrice: Number(totalPrice),
//           user,
//         });

//         // Update the hotel room availability
//         await updateHotelRoom(hotelRoom);

//         return new NextResponse("Booking successful", { status: 200 });
//       } catch (error: any) {
//         console.error("Error while processing booking:", error);
//         return new NextResponse("Error processing booking", { status: 500 });
//       }

//     default:
//       console.log(`Unhandled event type ${event.type}`);
//       return new NextResponse("Event Received", { status: 200 });
//   }
// }

import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { createBooking, updateHotelRoom } from "@/libs/apis";

// Define the Stripe event type
const CHECKOUT_SESSION_COMPLETED = "checkout.session.completed";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    // Check for missing signature or webhook secret
    if (!sig || !webhookSecret) {
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    // Construct the Stripe event
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: unknown) {
    // Handle webhook signature errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 500 }
    );
  }

  // Process the event based on its type
  switch (event.type) {
    case CHECKOUT_SESSION_COMPLETED: {
      // Ensure the event data object is correctly typed as a Stripe Checkout Session
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract metadata from the session object
      const metadata = session.metadata;
      if (!metadata) {
        return NextResponse.json(
          { error: "Missing metadata" },
          { status: 400 }
        );
      }

      const {
        adults,
        checkinDate,
        checkoutDate,
        children,
        hotelRoom,
        numberOfDays,
        user,
        discount,
        totalPrice,
      } = metadata;

      // Validate metadata fields
      if (
        !adults ||
        !checkinDate ||
        !checkoutDate ||
        !children ||
        !hotelRoom ||
        !numberOfDays ||
        !user ||
        !discount ||
        !totalPrice
      ) {
        return NextResponse.json(
          { error: "Incomplete metadata" },
          { status: 400 }
        );
      }

      try {
        // Create the booking using the metadata values
        await createBooking({
          adults: Number(adults),
          checkinDate,
          checkoutDate,
          children: Number(children),
          hotelRoom,
          numberOfDays: Number(numberOfDays),
          discount: Number(discount),
          totalPrice: Number(totalPrice),
          user,
        });

        // Update the hotel room availability
        await updateHotelRoom(hotelRoom);

        return NextResponse.json(
          { message: "Booking successful" },
          { status: 200 }
        );
      } catch (error: unknown) {
        console.error("Error while processing booking:", error);
        return NextResponse.json(
          { error: "Error processing booking" },
          { status: 500 }
        );
      }
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
      return NextResponse.json({ message: "Event received" }, { status: 200 });
  }
}
