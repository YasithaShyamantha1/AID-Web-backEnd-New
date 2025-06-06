"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandlingMiddleware = (error, req, res, next) => {
    console.log(error);
    if (error.name === "NotFoundError") {
        res.status(404).json({ message: error.message });
        return;
    }
    if (error.name === "ValidationError") {
        res.status(400).json({ message: error.message });
        return;
    }
    if (error.name === "UnauthenticatedError") {
        res.status(401).json({ message: error.message });
        return;
    }
    if (error.name === "ForbiddenError") {
        res.status(403).json({ message: error.message });
        return;
    }
    ;
    res.status(500).json({ message: "Internal Server Error" });
};
exports.default = globalErrorHandlingMiddleware;
//# sourceMappingURL=globalErrorHandlingMiddleware.js.map