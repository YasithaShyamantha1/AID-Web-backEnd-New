import express from "express";
import { createUser } from "../application/userController";

const usersRouter = express.Router();

usersRouter.post("/", createUser);

export default usersRouter;