import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => res.send("Server is Live!"));

app.listen(port, () =>
  console.log(`Server Listening at http://localhost:${port}`)
);
