import cors from "cors";
import "dotenv/config";
import express, { application } from "express";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import { showRouter } from "./routes/showRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { userRouter } from "./routes/userRouter.js";
import { stripeWebhooks } from "./controller/stripeWebhooks.js";

const app = express();
const port = process.env.PORT || 3000;

// App start and DB connect
await connectDB();
app.listen(port, () =>
  console.log(`Server Listening at http://localhost:${port}`)
);

// Allowed origins
const allowedOrigins = ["http://localhost:5173"];

// Stripe
app.post(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// Middlewares
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Inngest
app.use("/api/inngest", serve({ client: inngest, functions }));

// Routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
