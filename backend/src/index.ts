import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectToDatabase from './config/db.js';
import {PORT,APP_ORIGIN} from "./constants/env.js";
import {errorHandler} from "./middleware/errorHandler.js";
import {catchError} from "./utils/catchError.js"
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:APP_ORIGIN,
    credentials:true
}));

app.get("/",catchError(async(req,res,next)=>{
    throw new Error("This is a test errpr");
    res.json({
        msg:"Hello"
    })
}));

app.use(errorHandler);

app.listen(PORT,async ()=>{
    await connectToDatabase();
    console.log(`App listeing at port ${PORT}`);
});