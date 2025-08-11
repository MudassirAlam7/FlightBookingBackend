import mongoose from "mongoose";
const flightSchema = new mongoose.Schema({
    airline: {
        type : String,
        required : true
    },
    flightNumber : {
        type : String,
        required : true,
        unique: true,
    },
    departure: {
        type : String,
        required : true,
    },
    destination : {
        type : String,
        required : true,  
    },
    departureTime : {
        type : Date,
        required : true
    },
    arrivalTime : {
        type : Date,
        required : true,
    },
    seatsAvailable : {
       economy : {
            type : Number,
            required : true,
            },
       business : {
                type : Number,
                required : true,
           },
       firstClass : {
                type : Number,
                required : true,
            }
    },
    price : {
        economy : {
            type : Number,
            required : true,
            },
       business : {
                type : Number,
                required : true,
           },
       firstClass : {
                type : Number,
                required : true,
            }
    }
}, 
{timestamps :true});

const Flight = mongoose.model("Flight", flightSchema)
export default Flight