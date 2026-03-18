import mongoose from "mongoose";
import { thirtyDayFromNow } from "../utils/date.js";

export interface sessionDocument extends mongoose.Document{
    userId:mongoose.Types.ObjectId;
    userAgent?:string;
    createdAt:Date;
    expiresAt:Date
}

const sessionSchema= new mongoose.Schema<sessionDocument>({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User", index:true},
    userAgent:{type:String},
    createdAt:{type:Date, default:Date.now, required:true},
    expiresAt:{type:Date, default:thirtyDayFromNow}
});

const sessionModel= mongoose.model<sessionDocument>("Session",sessionSchema);
export default sessionModel;