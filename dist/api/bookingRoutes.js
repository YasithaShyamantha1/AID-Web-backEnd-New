"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../application/bookingController");
//import { isAuthenticated } from "./middlewares/authenticationMiddleware";
const express_2 = require("@clerk/express");
const bookingsRouter = express_1.default.Router();
bookingsRouter.route("/").post(bookingController_1.createBooking).get(bookingController_1.getAllBookings);
bookingsRouter.route("/hotels/:hotelId").get(bookingController_1.getAllBookingsForHotel);
bookingsRouter.route("/:userId").get(bookingController_1.getUserBookings);
bookingsRouter.post("/", (0, express_2.requireAuth)({ signInUrl: "http://localhost:5173/auth/sign-in" }), bookingController_1.createBooking);
bookingsRouter.put("/:userId", (0, express_2.requireAuth)(), bookingController_1.editBooking);
bookingsRouter.delete("/:userId", (0, express_2.requireAuth)(), bookingController_1.deleteBooking);
exports.default = bookingsRouter;
//# sourceMappingURL=bookingRoutes.js.map