import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  userId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  // status:{
  //   type: String,
  //   default: 'active', // 'active', 'cancelled'
  // }
});


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
