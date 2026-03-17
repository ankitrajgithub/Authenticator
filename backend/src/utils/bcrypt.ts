import bcrypt from "bcrypt";

export const hashValue=async (value:string,saltRounds?:number)=>{
    return bcrypt.hash(value,saltRounds || 8);
}

export const compareValue =async (value:string,hash:string)=>{
    bcrypt.compare(value,hash).catch(()=>false);
}