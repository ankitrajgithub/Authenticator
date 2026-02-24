import {ErrorRequestHandler} from "express";

export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    console.log(`Path ${req.path} - `+err);
    return res.status(500).json({
        Error:`Path ${req.path} - `+err.message
    })
}