import { NextFunction, Request, Response } from "express";
import Booking from "../infrastucture/schemas/BookingModel";
import { CreateBookingDTO } from "../domain/dtos/bookingZ";
import ValidationError from "../domain/validationError";
// import { clerkClient } from "@clerk/express";
import { clerkClient, getAuth, requireAuth } from "@clerk/express";



export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {  // Explicit return type
  try {
    const body = { 
      ...req.body, 
      checkIn: new Date(req.body.checkIn), 
      checkOut: new Date(req.body.checkOut) 
    };

    // Validate the request data
    const booking = CreateBookingDTO.safeParse(body);
    console.log(booking);
    if (!booking.success) {
      throw new ValidationError(booking.error.message);
    }

    // const user = req.auth;
    // console.log("id:",user);
    // if (!user || !user.userId) {
    //   res.status(401).json({ error: "Unauthorized: User is not authenticated" });
    //   return;
    // }
    // console.log("Auth Data:", req.auth);

    const { userId } = getAuth(req);
    if (!userId) {
      throw new Error("User ID is null");
    }
    
    const user = await clerkClient.users.getUser(userId);
    
    // Add the booking
    const response = await Booking.create({
      hotelId: booking.data.hotelId,
      userId: userId,
      checkIn: booking.data.checkIn,
      checkOut: booking.data.checkOut,
      roomNumber: booking.data.roomNumber,
    });
    console.log("res",response);
     res.status(201).json({ message: 'Booking created successfully', data: response });
  } catch (error) {
    next(error);
  }
};


export const getAllBookingsForHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const bookings = await Booking.find({ hotelId }).populate("userId");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const editBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {  
  const { id } = req.params;  
  const { checkIn, checkOut, roomNumber } = req.body;  

  try {
    // Find the booking by ID and update the fields
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { checkIn, checkOut, roomNumber },
      { new: true }  // Return the updated document
    );

    if (!updatedBooking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    next(error);  // Pass the error to the next middleware for handling
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {  
  const { id } = req.params;  

  try {
    
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    next(error);  // Pass the error to the next middleware for handling
  }
};

export const getUserBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {  // Explicit return type
  try {
    const { userId } = req.params;
    
    // Validate userId
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    // Get bookings for the user
    const bookings = await Booking.find({ userId });
    console.log("bookings", bookings);
    
    // Return the bookings
    res.status(200).json({ message: 'Bookings retrieved successfully', data: bookings });
  } catch (error) {
    next(error);
  }
};
