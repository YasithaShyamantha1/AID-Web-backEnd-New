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
const express_1 = __importDefault(require("express"));
const hotelContoller_1 = require("../application/hotelContoller");
const authenticationMiddleware_1 = require("./middlewares/authenticationMiddleware");
const embeddings_1 = require("./embeddings");
const retrieve_1 = require("../application/retrieve");
const HotelModel_1 = __importDefault(require("../infrastucture/schemas/HotelModel"));
const hotelRouter = express_1.default.Router();
hotelRouter.get("/:id", hotelContoller_1.getHotelById);
// hotelRouter.get("/",gettAllHotels);
hotelRouter.post("/", authenticationMiddleware_1.isAuthenticated, hotelContoller_1.createHotel);
hotelRouter.delete("/:id", hotelContoller_1.deleteHotel);
hotelRouter.put("/:id", hotelContoller_1.updateHotel);
hotelRouter.route("/embeddings/create").post(embeddings_1.createEmbeddings);
hotelRouter.route("/search/retrieve").get(retrieve_1.retrieve);
hotelRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, sort } = req.query;
        let filter = {};
        if (typeof location === "string" && location !== "ALL") {
            filter.location = { $regex: new RegExp(location, "i") }; // Ensure location is string
        }
        let sortOption = {};
        if (sort === "asc") {
            sortOption = { price: 1 }; // Low to High
        }
        else if (sort === "desc") {
            sortOption = { price: -1 }; // High to Low
        }
        const hotels = yield HotelModel_1.default.find(filter).sort(sortOption); // Ensure `Hotel` is correct
        res.status(200).json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
exports.default = hotelRouter;
//# sourceMappingURL=hotelRoutes.js.map