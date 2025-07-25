import Flight from "../models/flight.model.js";
import Booking from "../models/booking.model.js";
import { customResponse } from "../utils/customResponse.js";

const bookFlight = async (req, res) => {
  try {
    const { flightId, seatCount } = req.body;
    const userId = req.user.userId;
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return customResponse(
        res,
        400,
        "flight not found",
        "Invalid flight",
        false,
        null
      );
    }
    if (seatCount > flight.seatsAvailable) {
      return customResponse(
        res,
        400,
        "seats is not available",
        "seats full",
        false,
        null
      );
    }
    const booking = await Booking.create({
      user: userId,
      flight: flightId,
      seatCount,
    });
    flight.seatsAvailable -= seatCount;
    await flight.save();
    return customResponse(res, 201, "Booking successfull", null, true, booking);
  } catch (error) {
    return customResponse(
      res,
      500,
      "something went wrong",
      error.message,
      false,
      null
    );
  }
};

const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return customResponse(
        res,
        400,
        "Booking not found",
        "Invalid Id",
        false,
        null
      );
    }
    if (booking.user.toString() !== userId && userRole !== "admin") {
      return customResponse(
        res,
        403,
        "Unauthorized",
        "Not your booking",
        false,
        null
      );
    }
    const flight = await Flight.findById(booking.flight);
    if (flight) {
      flight.seatsAvailable += booking.seatCount;
      await flight.save();
    }

    await booking.deleteOne();
    return customResponse(
      res,
      200,
      "Booking cancelled successfully",
      null,
      true,
      null
    );
  } catch (error) {
    return customResponse(res, 500, "Server error", error.message, false, null);
  }
};
export {cancelBooking, bookFlight}