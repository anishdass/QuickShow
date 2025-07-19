import { getCurrentShow } from "../utils/utilsDB.js";
import { checkAvailabilityOfSelectedSeats } from "../utils/utils.js";
import Booking from "../models/Booking.js";
import Shows from "../models/Shows.js";

// Function to create booking
export const createBooking = async (req, res) => {
  try {
    const { userId } = req.auth?.();

    const { selectedSeats, showId } = req.body;

    const { origin } = req.headers;

    const isAvailable = !(await checkAvailabilityOfSelectedSeats(
      selectedSeats,
      showId
    ));
    if (!isAvailable) {
      return res.json({ success: false, message: "Seats unavailable" });
    }

    const currentShow = await getCurrentShow(showId);

    const booking = createBooking(currentShow, selectedSeats, userId, showId);

    selectedSeats.map((seat) => {
      currentShow.occupiedSeats[seat] = userId;
    });

    currentShow.markModified("occupiedSeats");

    await currentShow.save();

    res.json({ success: true, message: "Booking Successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: "Error creating booking" });
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
      success: true,
      message: "Error fetching occupied seats",
    });
  }
};
