import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("Error: MONGO_URI is not defined in the environment variables.");
      process.exit(1); // Exit the process if MONGO_URI is not defined
    }
  
    try {
      const connection = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds instead of hanging
      });
      console.log(`MongoDB connected`);
    } catch (error) {
      console.error("Error connecting to the database:");
      process.exit(1);
    }
  };
  
  export default connectDB;
  

