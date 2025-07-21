import express from "express";
import {
  createBooking,
  getOccupiedSeats,
} from "../controller/bookingController.js";

export const bookingRouter = express.Router();

bookingRouter.get("/create-booking", createBooking);
bookingRouter.get("/seats/:showId", getOccupiedSeats);
