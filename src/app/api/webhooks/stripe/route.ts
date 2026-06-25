import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("Stripe-Signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Webhook Secret or Signature missing", { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as any;
      const userId = session.metadata?.userId;

      if (userId && adminDb) {
        await adminDb.collection("users").doc(userId).update({
          plan: "pro",
          stripeSubscriptionId: session.subscription,
          updatedAt: new Date().toISOString(),
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
