"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const hotelRoutes_1 = __importDefault(require("./api/hotelRoutes"));
const db_1 = __importDefault(require("./infrastucture/db"));
const userRouter_1 = __importDefault(require("./api/userRouter"));
const bookingRoutes_1 = __importDefault(require("./api/bookingRoutes"));
const express_2 = require("@clerk/express");
const globalErrorHandlingMiddleware_1 = __importDefault(require("./api/middlewares/globalErrorHandlingMiddleware"));
const chatRoutes_1 = __importDefault(require("./api/chatRoutes"));
const app = (0, express_1.default)();
app.use((0, express_2.clerkMiddleware)());
// Enable CORS
app.use((0, cors_1.default)({
    origin: "https://horizonehotels-frontend-yasitha.netlify.app", // Replace with your frontend URL
    credentials: true, // Allow cookies & authentication headers
}));
app.use(express_1.default.json());
app.use(globalErrorHandlingMiddleware_1.default);
(0, db_1.default)();
app.use("/api/hotels", hotelRoutes_1.default);
app.use("/api/user", userRouter_1.default);
app.use("/api/booking", bookingRoutes_1.default);
app.use("/api/chat", chatRoutes_1.default);
const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
// console.log("MongoDB URI:", process.env.MONGO_URI);
// password="0yusFavVxfXPf23e"
// .env ="mongodb+srv://yasithagodaarawa:0yusFavVxfXPf23e@aid-webapp.xvrwg.mongodb.net/?retryWrites=true&w=majority&appName=AID-WebApp"
//# sourceMappingURL=index.js.map