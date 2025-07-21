import express from "express";
import {
  getAllBookings,
  getAllUpcomingShows,
  getDashboardData,
  isAdmin,
} from "../controller/adminController.js";
import { adminAuth } from "../middleware/auth.js";

export const adminRouter = express.Router();

adminRouter.get("/is-admin", adminAuth, isAdmin);
adminRouter.get("/dashboard", getDashboardData);
adminRouter.get("/upcoming-shows", getAllUpcomingShows);
adminRouter.get("/all-bookings", getAllBookings);
