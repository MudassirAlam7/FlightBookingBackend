import mongoose from "mongoose";
const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully");
        console.log(`Server running on port ${process.env.PORT || 5000}`);
        
    }
    catch(err){
        console.error("Database connection error:", err);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;