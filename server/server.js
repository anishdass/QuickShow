import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { showRouter } from "./routes/showRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";

const app = express();
const port = process.env.PORT || 3000;

// App start and DB connect
await connectDB();
app.listen(port, () =>
  console.log(`Server Listening at http://localhost:${port}`)
);

// Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/inngest", serve({ client: inngest, functions }));
// Show
app.use("/api/show", showRouter);
// Booking
app.use("/api/booking", bookingRouter);
