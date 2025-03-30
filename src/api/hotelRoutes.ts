import express from "express";
import { getHotelById,gettAllHotels,createHotel,deleteHotel,updateHotel, generateResponse } from "../application/hotelContoller";
import { isAuthenticated } from "./middlewares/authenticationMiddleware";
import { createEmbeddings } from "./embeddings";
import { retrieve } from "../application/retrieve";
import { Request, Response } from "express";
import Hotel from "../infrastucture/schemas/HotelModel";

const hotelRouter = express.Router();

hotelRouter.get("/:id", getHotelById);
// hotelRouter.get("/",gettAllHotels);
hotelRouter.post("/",isAuthenticated, createHotel);
hotelRouter.delete("/:id",deleteHotel);
hotelRouter.put("/:id",updateHotel);
hotelRouter.route("/embeddings/create").post(createEmbeddings);
hotelRouter.route("/search/retrieve").get(retrieve);
hotelRouter.get("/", async (req: Request, res: Response) => {
    try {
      const { location, sort } = req.query;
  
      let filter: any = {};
  
      if (typeof location === "string" && location !== "ALL") {
        filter.location = { $regex: new RegExp(location, "i") }; // Ensure location is string
      }
  
      let sortOption = {};
      if (sort === "asc") {
        sortOption = { price: 1 }; // Low to High
      } else if (sort === "desc") {
        sortOption = { price: -1 }; // High to Low
      }
  
      const hotels = await Hotel.find(filter).sort(sortOption); // Ensure `Hotel` is correct
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
  



export default hotelRouter;
