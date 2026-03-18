import { createAccount } from "../services/auth.service.js";
import { catchError } from "../utils/catchError.js";
import {z} from "zod";
import { setAuthCookies } from "../utils/cookies.js";
import { CREATED } from "../constants/http.js";

const registerSchema=z.object({
    email:z.string().email().min(1).max(255),
    password:z.string().min(6).max(255),
    confirmPassword:z.string().min(6).max(255),
    userAgent:z.string().optional()
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Password do not match",
        path: ["confirmPassword"],
    }
);

export const registerHandler=catchError(async (req,res)=>{
    //Validate request
    const request=registerSchema.parse({
        ...req.body,
        userAgent:req.headers["user-agent"]
    });

    //Call service
    const {user, accessToken, refreshToken}=await createAccount(request);

    //Return response
    setAuthCookies({res, accessToken, refreshToken});
    res.status(CREATED).json(user);
});