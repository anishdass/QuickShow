import Stripe from "stripe";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { inngest } from "../inngest/index.js";

export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error:${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });
        const session = sessionList.data[0];
        const { bookingId } = session.metadata;
        await Booking.findByIdAndUpdate(bookingId, {
          isPaid: true,
          paymentLink: "",
        });

        // Send confirmation email
        await inngest.send({
          name: "app/show.booked",
          data: { bookingId },
        });
        break;

      default:
        console.log("Unhandled event type", event.type);
        break;
    }
    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error", error);
    res.status(500).send("Internal Server Error");
  }
};
