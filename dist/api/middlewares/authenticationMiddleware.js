"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const unAuthorizedError_1 = __importDefault(require("../../domain/unAuthorizedError"));
const isAuthenticated = (req, res, next) => {
    var _a;
    console.log("🔍 Checking authentication...", req.auth);
    if (!((_a = req.auth) === null || _a === void 0 ? void 0 : _a.userId)) {
        throw new unAuthorizedError_1.default("Unauthorized");
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authenticationMiddleware.js.map