import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    },
    seatClass: {
        type: String,
        enum: ["economy", "business", "first"], // allowed values
        required: true
    },
    seatCount: {
        type: Number,
        required: true,
        min: 1
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, 
{ timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
