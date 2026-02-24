import {RequestHandler} from "express";

export const catchError=(controller:RequestHandler):RequestHandler=>{
    return async(req,res,next)=>{
        try{
            await controller(req,res,next);
        }catch(error){
            next(error);
        }
    }
}
