import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"; 
import hotelRouter from "./api/hotelRoutes";
import connectDB from "./infrastucture/db";
import usersRouter from "./api/userRouter";
import bookingsRouter from "./api/bookingRoutes";
import { clerkMiddleware } from "@clerk/express";
import globalErrorHandlingMiddleware from "./api/middlewares/globalErrorHandlingMiddleware";
import chatRouter from "./api/chatRoutes";

const app = express();


app.use(clerkMiddleware());
// Enable CORS
// app.use(
//     cors({
//       origin: "https://horizonehotels-frontend-yasitha.netlify.app", // Replace with your frontend URL
//       credentials: true, // Allow cookies & authentication headers
//     })
//   );

app.use(
  cors({
    origin: "https://horizonehotels-frontend-yasitha.netlify.app",  // Allow all origins temporarily for debugging
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization"
  })
);



app.use(express.json());
app.use(globalErrorHandlingMiddleware);
connectDB();

app.use("/api/hotels", hotelRouter);
app.use("/api/user", usersRouter);
app.use("/api/booking", bookingsRouter);
app.use("/api/chat",chatRouter);



const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));

// console.log("MongoDB URI:", process.env.MONGO_URI);




// password="0yusFavVxfXPf23e"
// .env ="mongodb+srv://yasithagodaarawa:0yusFavVxfXPf23e@aid-webapp.xvrwg.mongodb.net/?retryWrites=true&w=majority&appName=AID-WebApp"