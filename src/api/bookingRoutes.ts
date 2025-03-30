import express from "express";
import {createBooking,getAllBookingsForHotel,getAllBookings, editBooking, deleteBooking, getUserBookings} from "../application/bookingController";
//import { isAuthenticated } from "./middlewares/authenticationMiddleware";
import {  requireAuth } from "@clerk/express";

const bookingsRouter = express.Router();

bookingsRouter.route("/").post( createBooking).get( getAllBookings);
bookingsRouter.route("/hotels/:hotelId").get( getAllBookingsForHotel);
bookingsRouter.route("/:userId",).get( getUserBookings);

bookingsRouter.post("/", 
  requireAuth({ signInUrl: "http://https://aid-web-app-back-end-2.onrender.com/auth/sign-in" }), createBooking);
bookingsRouter.put("/:userId", requireAuth(), editBooking);
bookingsRouter.delete("/:userId", requireAuth(), deleteBooking);

export default bookingsRouter;

