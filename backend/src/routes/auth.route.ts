import {Router,Request,Response} from "express";
import {z} from "zod";
import { catchError } from "../utils/catchError.js";
import { registerHandler } from "../controllers/auth.controller.js";

const authRoutes=Router();

authRoutes.post("/register",registerHandler);

export default authRoutes;