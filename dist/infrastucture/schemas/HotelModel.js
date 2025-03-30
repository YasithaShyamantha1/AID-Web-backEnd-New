"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hotelSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    // rating: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    //   required: true,
    // },
    // reviews: {
    //   type: Number,
    //   required: true,
    // },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
const Hotel = mongoose_1.default.model("Hotel", hotelSchema);
exports.default = Hotel;
//# sourceMappingURL=HotelModel.js.map