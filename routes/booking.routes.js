import express from "express";
import { bookFlight, cancelBooking } from "../controllers/booking.controller.js";

const bookingRouter = express.Router()
bookingRouter.post("/booking", bookFlight)
bookingRouter.post("/cancelbooking", cancelBooking)

export default bookingRouter