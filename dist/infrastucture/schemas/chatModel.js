"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    messages: [{
            role: { type: String, enum: ["user", "assistant", "system"], required: true },
            content: { type: String, required: true }
        }],
    createdAt: { type: Date, default: Date.now }
});
exports.Chat = (0, mongoose_1.model)("Chat", ChatSchema);
//# sourceMappingURL=chatModel.js.map