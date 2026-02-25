import {ErrorRequestHandler,Response,Request} from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import {z} from "zod";

function handleZodError(req:Request,res:Response,err:z.ZodError){
    console.log(`Path ${req.path} - `+err);
    const errors=err.issues.map((error)=>({
        path:error.path,
        message:error.message
    }));
    return res.status(BAD_REQUEST).json({
        msg:err.message,
        errors
    });
}

export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    if(err instanceof z.ZodError){
        return handleZodError(req,res,err);
    }

    console.log(`Path ${req.path} - `+err);
    return res.status(INTERNAL_SERVER_ERROR).json({
        Error:"Internal Server Error"
    })
}