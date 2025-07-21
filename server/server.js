import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { showRouter } from "./routes/showRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();
const port = process.env.PORT || 3000;

// App start and DB connect
await connectDB();
app.listen(port, () =>
  console.log(`Server Listening at http://localhost:${port}`)
);

// Allowed origins
const allowedOrigins = ["http://localhost:5173"];

// Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));
// Show
app.use("/api/show", showRouter);
// Booking
app.use("/api/booking", bookingRouter);
// Admin
app.use("/api/admin", adminRouter);
// User
app.use("/api/user", userRouter);
