import express from "express";
import { bookFlight, cancelBooking, search } from "../controllers/booking.controller.js";
import protect from "../middleware/auth.middleware.js";

const bookingRouter = express.Router()
bookingRouter.post("/booking", protect, bookFlight)
bookingRouter.post("/cancelbooking", protect, cancelBooking)
bookingRouter.post("/search", search)

export default bookingRouter