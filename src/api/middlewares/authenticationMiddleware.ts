import UnauthorizedError from "../../domain/unAuthorizedError"
import { Request,Response,NextFunction } from "express"

export const isAuthenticated =(req: Request , res: Response, next: NextFunction) =>{
    console.log("🔍 Checking authentication...", req.auth);
    if (!req.auth?.userId) {
        throw new UnauthorizedError("Unauthorized");
      }
    next();
}