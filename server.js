import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import flightRouter from "./routes/flight.routes.js";
dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/booking", bookingRouter)
app.use("/api/flight", flightRouter)

// Connect to DB
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
