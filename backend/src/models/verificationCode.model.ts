import mongoose from "mongoose";
import verificationCodeTypes from "../constants/verificationCodeTypes.js";

export interface VerificationCodeDocument extends mongoose.Document{
    userId:mongoose.Types.ObjectId;
    type:verificationCodeTypes,
    expiresAt:Date,
    createdAt:Date
}

const verificationCodeSchema= new mongoose.Schema<VerificationCodeDocument>({
    userId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User", index:true},
    type:{type:String, required:true},
    expiresAt:{type:Date,required:true, default:Date.now},
    createdAt: {type:Date, required:true}
})

const verificationCodeModel=mongoose.model<VerificationCodeDocument>("VerificationCode",verificationCodeSchema,"verification_codes");

export default verificationCodeModel;