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
exports.generateResponse = void 0;
const openai_1 = __importDefault(require("openai"));
const HotelModel_1 = __importDefault(require("../infrastucture/schemas/HotelModel")); // ✅ FIXED: Corrected import path
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
const generateResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt, chatHistory = [] } = req.body;
        const messages = [
            { role: 'system', content: 'You are a helpful travel assistant. Help users find hotels.' },
            ...chatHistory,
            { role: 'user', content: prompt },
        ];
        const completion = yield openai.chat.completions.create({
            model: 'gpt-4o',
            messages,
            temperature: 0.7,
        });
        const aiResponse = completion.choices[0].message.content;
        let suggestedHotels = []; // ✅ FIXED: Explicitly defined type
        // Check if the query mentions hotels
        if (/hotel|stay|accommodation/i.test(prompt)) {
            suggestedHotels = yield HotelModel_1.default.find({
                $or: [
                    { name: { $regex: prompt, $options: 'i' } },
                    { location: { $regex: prompt, $options: 'i' } },
                ],
            }).limit(5);
        }
        res.status(200).json({
            success: true,
            message: {
                role: 'assistant',
                content: aiResponse,
            },
            suggestedHotels,
        });
    }
    catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating AI response',
        });
    }
});
exports.generateResponse = generateResponse;
//# sourceMappingURL=chatController.js.map