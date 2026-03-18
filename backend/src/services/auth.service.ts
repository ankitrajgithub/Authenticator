import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js";
import verificationCodeTypes from "../constants/verificationCodeTypes.js";
import sessionModel from "../models/session.model.js";
import userModel from "../models/user.model.js"
import verificationCodeModel from "../models/verificationCode.model.js";
import { oneYearFromNow } from "../utils/date.js";
import jwt from "jsonwebtoken";

export type userData={
    email:string,
    password:string,
    userAgent?:string | undefined
}

export const createAccount=async(data:userData)=>{

    //Check if user exists
    const existingUser=await userModel.findOne({
        email:data.email
    });
    if(existingUser){
        throw new Error("User already exists!!");
    }

    //create new user
    const user=await userModel.create({
        email:data.email,
        password:data.password,
    })

    //Create verification Code
    const verificationCode=await verificationCodeModel.create({
        userId:user._id,
        type:verificationCodeTypes.EmailVerification,
        expiresAt:oneYearFromNow(),
        createdAt:Date.now()
    })

    //Verification mail

    //Create session
    const session= await sessionModel.create({
        userId:user._id, 
        userAgent:data.userAgent ?? ""
    })

    //Sign access token and refresh token
    const refreshToken=jwt.sign({
        sessionId:session._id
    },JWT_REFRESH_SECRET,{
        expiresIn:"30d",
        audience:["user"]
    })

    const accessToken=jwt.sign({
        userId:user._id,
        sessionId:session._id
    },JWT_SECRET,{
        expiresIn:"15m",
        audience:["user"]
    })

    //return user and token
    return {
        user, accessToken, refreshToken
    }
}