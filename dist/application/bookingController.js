"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.deleteBooking = exports.editBooking = exports.getAllBookings = exports.getAllBookingsForHotel = exports.createBooking = void 0;
const BookingModel_1 = __importDefault(require("../infrastucture/schemas/BookingModel"));
const bookingZ_1 = require("../domain/dtos/bookingZ");
const validationError_1 = __importDefault(require("../domain/validationError"));
// import { clerkClient } from "@clerk/express";
const express_1 = require("@clerk/express");
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = Object.assign(Object.assign({}, req.body), { checkIn: new Date(req.body.checkIn), checkOut: new Date(req.body.checkOut) });
        // Validate the request data
        const booking = bookingZ_1.CreateBookingDTO.safeParse(body);
        console.log(booking);
        if (!booking.success) {
            throw new validationError_1.default(booking.error.message);
        }
        // const user = req.auth;
        // console.log("id:",user);
        // if (!user || !user.userId) {
        //   res.status(401).json({ error: "Unauthorized: User is not authenticated" });
        //   return;
        // }
        // console.log("Auth Data:", req.auth);
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            throw new Error("User ID is null");
        }
        const user = yield express_1.clerkClient.users.getUser(userId);
        // Add the booking
        const response = yield BookingModel_1.default.create({
            hotelId: booking.data.hotelId,
            userId: userId,
            checkIn: booking.data.checkIn,
            checkOut: booking.data.checkOut,
            roomNumber: booking.data.roomNumber,
        });
        console.log("res", response);
        res.status(201).json({ message: 'Booking created successfully', data: response });
    }
    catch (error) {
        next(error);
    }
});
exports.createBooking = createBooking;
const getAllBookingsForHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hotelId } = req.params;
        const bookings = yield BookingModel_1.default.find({ hotelId }).populate("userId");
        res.status(200).json(bookings);
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllBookingsForHotel = getAllBookingsForHotel;
const getAllBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield BookingModel_1.default.find();
        res.status(200).json(bookings);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBookings = getAllBookings;
const editBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { checkIn, checkOut, roomNumber } = req.body;
    try {
        // Find the booking by ID and update the fields
        const updatedBooking = yield BookingModel_1.default.findByIdAndUpdate(id, { checkIn, checkOut, roomNumber }, { new: true } // Return the updated document
        );
        if (!updatedBooking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }
        res.status(200).json(updatedBooking);
    }
    catch (error) {
        next(error); // Pass the error to the next middleware for handling
    }
});
exports.editBooking = editBooking;
const deleteBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBooking = yield BookingModel_1.default.findByIdAndDelete(id);
        if (!deletedBooking) {
            res.status(404).json({ error: 'Booking not found' });
            return;
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    }
    catch (error) {
        next(error); // Pass the error to the next middleware for handling
    }
});
exports.deleteBooking = deleteBooking;
const getUserBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Validate userId
        if (!userId) {
            throw new Error("User ID is required");
        }
        // Get bookings for the user
        const bookings = yield BookingModel_1.default.find({ userId });
        console.log("bookings", bookings);
        // Return the bookings
        res.status(200).json({ message: 'Bookings retrieved successfully', data: bookings });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserBookings = getUserBookings;
//# sourceMappingURL=bookingController.js.map