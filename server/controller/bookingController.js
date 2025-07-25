import { bookTickets, getCurrentShow } from "../utils/utilsDB.js";
import { checkAvailabilityOfSelectedSeats } from "../utils/utils.js";
import Stripe from "stripe";

// Function to create booking
export const createBooking = async (req, res) => {
  try {
    // const origin = "http://localhost:5173/";
    // const userId = process.env.TEST_USER;
    const userId = req.auth().userId;
    const { origin } = req.headers;
    const { selectedSeats, showId } = req.body;

    const isAvailable = await checkAvailabilityOfSelectedSeats(
      selectedSeats,
      showId
    );

    if (!isAvailable) {
      return res.json({ success: false, message: "Seats unavailable" });
    }
    const currentShow = await getCurrentShow(showId);
    const booking = await bookTickets(
      currentShow,
      selectedSeats,
      userId,
      showId
    );
    selectedSeats.map((seat) => {
      currentShow.occupiedSeats[seat] = userId;
    });
    currentShow.markModified("occupiedSeats");
    await currentShow.save();

    // Payment integration
    // Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Line items
    const line_items = [
      {
        price_data: {
          currency: "gbp",
          product_data: { name: currentShow.movieId.title },
          unit_amount: Math.floor(booking.amount) * 100,
        },
        quantity: 1,
      },
    ];

    // Checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items,
      mode: "payment",
      metadata: { bookingId: booking._id.toString() },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    // Add payment url to booking data
    booking.paymentLink = session.url;
    await booking.save();

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Error creating booking" });
  }
};

// function to get occupied seats
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const currentShow = await getCurrentShow(showId);
    const occupiedSeats = Object.keys(currentShow.occupiedSeats);
    return res.json({ success: true, data: occupiedSeats });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error fetching occupied seats",
    });
  }
};
