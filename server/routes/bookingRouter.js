import express from "express";
import { adminAuth } from "../middleware/auth.js";
import {
  createBooking,
  getOccupiedSeats,
} from "../controller/bookingController.js";

export const bookingRouter = express.Router();

bookingRouter.get("/create-booking", createBooking);
bookingRouter.get("/seats/:showId", getOccupiedSeats);
