import Flight from "../models/flight.model.js";
import { customResponse } from "../utils/customResponse.js";

const createFlight = async(req, res)=>{
    try{
        const { airline, flightNumber, departure, destination, departureTime, arrivalTime, seatsAvailable, price } = req.body;
        if (!airline || !flightNumber || !departure || !destination || !departureTime || !arrivalTime || !seatsAvailable || !price) {
              return customResponse(res, 400, "All fields are required", "Missing fields", false, null);
        }
         if (
      typeof seatsAvailable.economy !== "number" ||
      typeof seatsAvailable.business !== "number" ||
      typeof seatsAvailable.first !== "number"
    ) {
      return customResponse(res, 400, "Seats for all classes must be numbers", "Invalid seatsAvailable", false, null);
    }
     if (
      typeof price.economy !== "number" ||
      typeof price.business !== "number" ||
      typeof price.first !== "number"
    ) {
      return customResponse(res, 400, "Prices for all classes must be numbers", "Invalid price", false, null);
    }
      const flight = await Flight.create({
      airline,
      flightNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
      seatsAvailable,
      price,
    });

    return customResponse(res, 201, "Flight created successfully", null, true, flight);
    }
    catch(error){
        return customResponse(res, 500, "something went wrong", "server error", false, null)
    }
}
const getAllFlight = async (req, res)=>{
    try{
        const flights = await Flight.find().select("-__v");
        return customResponse(res, 200, "flight fetched successfully", null, true, flights)
    }
    catch(error){
        return customResponse(res, 500, "something went wrong", error.message, false, null);
    }
}


const getFlightById = async (req, res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return customResponse(res, 400, "something went wrong", "missing input", false, null)
        }
        const flight = await Flight.findById(id)

        if(!flight){
            return customResponse(res, 400, "This flight is not exist", "Invalid Id", false, null)
        }

        return customResponse(res, 200, "Flight fetched successfully", null, true, flight)
    } catch (error) {
        
    }
}

const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFlight = await Flight.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlight) {
      return customResponse(res, 404, "Flight not found", "Invalid ID", false, null);
    }

    return customResponse(res, 200, "Flight updated successfully", null, true, updatedFlight);
  } catch (error) {
    return customResponse(res, 500, "Server Error", error.message, false, null);
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlight = await Flight.findByIdAndDelete(id);
    if (!deletedFlight) {
      return customResponse(res, 404, "Flight not found", "Invalid ID", false, null);
    }

    return customResponse(res, 200, "Flight deleted successfully", null, true, deletedFlight);
  } catch (error) {
    return customResponse(res, 500, "Server Error", error.message, false, null);
  }
};
export {deleteFlight, updateFlight, getAllFlight, getFlightById, createFlight}