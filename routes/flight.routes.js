import express from "express";
import {deleteFlight, updateFlight, getAllFlight, getFlightById, createFlight} from "../controllers/flight.controller.js"
const flightRouter = express.Router()

flightRouter.get("/", getAllFlight)
flightRouter.post("/create", createFlight)
flightRouter.post("/getflightbyId", getFlightById)
flightRouter.patch("/update/flight", updateFlight)
flightRouter.delete("/delete/flight", deleteFlight)
export default flightRouter