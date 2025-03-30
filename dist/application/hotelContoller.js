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
exports.updateHotel = exports.deleteHotel = exports.createHotel = exports.generateResponse = exports.getHotelById = exports.gettAllHotels = void 0;
const HotelModel_1 = __importDefault(require("../infrastucture/schemas/HotelModel"));
const notFounderror_1 = __importDefault(require("../domain/notFounderror"));
const validationError_1 = __importDefault(require("../domain/validationError"));
const hotelZ_1 = require("../domain/dtos/hotelZ");
const openai_1 = __importDefault(require("openai"));
const hotels = [
    {
        _id: "1",
        name: "Montmartre Majesty Hotel",
        location: "Paris, France",
        rating: 4.7,
        reviews: 2578,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/297840629.jpg?k=d20e005d5404a7bea91cb5fe624842f72b27867139c5d65700ab7f69396026ce&o=&hp=1",
        price: 160,
        description: "Stay in the heart of Paris, France, at the Montmartre Majesty Hotel, where elegance meets charm. Perfect for exploring iconic landmarks like the Eiffel Tower and the Louvre, this hotel offers a tranquil escape from the bustling city. With luxurious rooms starting at $160 per night, enjoy breathtaking rooftop views, exquisite French cuisine, and the romantic ambiance of Montmartre. Ideal for a dreamy city getaway.",
        __v: 0,
    },
    {
        _id: "2",
        name: "Loire Luxury Lodge",
        location: "Sydney, Australia",
        rating: 4.9,
        reviews: 985,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/596257607.jpg?k=0b513d8fca0734c02a83d558cbad7f792ef3ac900fd42c7d783f31ab94b4062c&o=&hp=1",
        price: 350,
        description: "Overlooking Sydney Harbour, Loire Luxury Lodge provides unmatched waterfront views and a vibrant city experience. From $350 per night, relax in modern luxury while enjoying proximity to Sydney Opera House and Bondi Beach. Whether you’re seeking adventure or relaxation, this hotel offers a harmonious blend of urban excitement and tranquil sophistication.",
        __v: 0,
    },
    {
        _id: "3",
        name: "Tokyo Tower Inn",
        location: "Tokyo, Japan",
        rating: 4.6,
        reviews: 875,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/308797093.jpg?k=3a35a30f15d40ced28afacf4b6ae81ea597a43c90c274194a08738f6e760b596&o=&hp=1",
        price: 180,
        description: "Discover the vibrant energy of Tokyo at Tokyo Tower Inn, located in the heart of Japan’s bustling capital. For $180 per night, guests can enjoy modern comforts, panoramic city views, and access to iconic attractions like Shibuya Crossing and the Imperial Palace. Ideal for foodies, tech enthusiasts, and urban explorers.",
        __v: 0,
    },
    {
        _id: "4",
        name: "Sydney Harbour Hotel",
        location: "Sydney, Australia",
        rating: 4.8,
        reviews: 1023,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/84555265.jpg?k=ce7c3c699dc591b8fbac1a329b5f57247cfa4d13f809c718069f948a4df78b54&o=&hp=1",
        price: 200,
        description: "Stay at Sydney Harbour Hotel and wake up to stunning harbour views in one of Australia’s most iconic destinations. Starting at $200 per night, enjoy rooftop dining, modern facilities, and close proximity to Darling Harbour and Sydney’s vibrant nightlife. Ideal for couples and city adventurers.",
        __v: 0,
    },
    {
        _id: "5",
        name: "Milan Central Suites",
        location: "Milan, Italy",
        rating: 4.5,
        reviews: 670,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/608273980.jpg?k=c7df20ffb25ae52b6a17037dc13f5e15b94a0fe253a9b9d0b656f6376eabec7d&o=&hp=1",
        price: 140,
        description: "Nestled in the fashion capital of Milan, Italy, Milan Central Suites combines style and comfort for an unforgettable stay. At $140 per night, enjoy proximity to the Duomo and Galleria Vittorio Emanuele II, making it perfect for shoppers and culture enthusiasts alike.",
        __v: 0,
    },
    {
        _id: "6",
        name: "Elysée Retreat",
        location: "Kyoto, Japan",
        rating: 4.8,
        reviews: 1236,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/606303798.jpg?k=514943d0025704b27396faf82af167468d8b50b98f311668f206f79ca36cb53d&o=&hp=1",
        price: 150,
        description: "Immerse yourself in Kyoto’s serene beauty at Elysée Retreat, a sanctuary of peace and tradition. Discover the charm of Japanese gardens, historic temples, and tea ceremonies, all just steps away. For $150 per night, indulge in authentic Kyoto hospitality, minimalistic elegance, and an unforgettable cultural experience tailored for nature lovers and tranquility seekers.",
        __v: 0,
    },
    {
        _id: "7",
        name: "Versailles Vista Inn",
        location: "Rome, Italy",
        rating: 4.7,
        reviews: 1356,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/60307464.jpg?k=67ae35316203e2ec82d8e02e0cef883217cce9c436da581528b94ad6dee8e393&o=&hp=1",
        price: 220,
        description: "Located in the historic heart of Rome, Italy, Versailles Vista Inn offers a touch of Renaissance luxury. Explore the Colosseum and Vatican City by day and retreat to opulent comfort at night. Starting at $220 per night, guests enjoy fine Italian dining, elegant interiors, and a prime location for experiencing Rome’s timeless culture. Ideal for history buffs and luxury seekers.",
        __v: 0,
    },
    {
        _id: "8",
        name: "Parisian Palace",
        location: "Paris, France",
        rating: 4.9,
        reviews: 2135,
        image: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/308794596.jpg?k=76bbd047a4f3773844efb15819a637f10fb98671244760fcd69cf26d1073b797&o=&hp=1",
        price: 320,
        description: "Experience ultimate luxury at Parisian Palace, a gem in the heart of Paris, France. For $320 per night, immerse yourself in timeless elegance with grand interiors, Michelin-star dining, and breathtaking views of the Seine. Perfect for a romantic escape or a refined city retreat.",
        __v: 0,
    },
];
const gettAllHotels = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield HotelModel_1.default.find();
        res.status(200).json(hotels);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.gettAllHotels = gettAllHotels;
const getHotelById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelId = req.params.id;
        const hotel = yield HotelModel_1.default.findById(hotelId);
        if (!hotel) {
            throw new notFounderror_1.default("Hotel not found");
        }
        res.status(200).json(hotel);
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.getHotelById = getHotelById;
// AI code
const generateResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    const openai = new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const completion = yield openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            { role: "user", content: prompt },
        ],
        store: true,
    });
    res.status(200).json({
        message: {
            role: "assistant",
            content: completion.choices[0].message.content,
        },
    });
    return;
});
exports.generateResponse = generateResponse;
const createHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = hotelZ_1.CreateHotelDTO.safeParse(req.body);
        // Validate the request data
        if (!hotel.success) {
            throw new validationError_1.default(hotel.error.message);
        }
        // Create the hotel entry
        yield HotelModel_1.default.create({
            name: hotel.data.name,
            location: hotel.data.location,
            image: hotel.data.image,
            price: hotel.data.price,
            description: hotel.data.description,
        });
        res.status(201).send();
    }
    catch (error) {
        next(error);
    }
});
exports.createHotel = createHotel;
const deleteHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelId = req.params.id;
        yield HotelModel_1.default.findByIdAndDelete(hotelId);
        // Return the response
        res.status(200).send();
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.deleteHotel = deleteHotel;
const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelId = req.params.hotelId;
        const updatedHotel = req.body;
        // Validate the request data
        if (!updatedHotel.name ||
            !updatedHotel.location ||
            !updatedHotel.rating ||
            !updatedHotel.reviews ||
            !updatedHotel.image ||
            !updatedHotel.price ||
            !updatedHotel.description) {
            throw new validationError_1.default("Invalid hotel data");
        }
        yield HotelModel_1.default.findByIdAndUpdate(hotelId, updatedHotel);
        // Return the response
        res.status(200).send();
        return;
    }
    catch (error) {
        next(error);
    }
});
exports.updateHotel = updateHotel;
//# sourceMappingURL=hotelContoller.js.map