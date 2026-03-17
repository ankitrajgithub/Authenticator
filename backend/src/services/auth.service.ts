import verificationCodeTypes from "../constants/verificationCodeTypes.js";
import userModel from "../models/user.model.js"
import verificationCodeModel from "../models/verificationCode.model.js";
import { oneYearFromNow } from "../utils/date.js";

export type userData={
    email:string,
    password:string,
    userAgent?:string
}

export const createAccount=async(data:userData)=>{

    //Check if user exists
    const existingUser=await userModel.find({
        email:data.email
    });
    if(existingUser){
        return new Error("User already exists!!");
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
        // createdAt:Date.now()
    })

    //Verification mail

    //Create session
}