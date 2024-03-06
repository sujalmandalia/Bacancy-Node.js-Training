import bcrypt from "bcrypt";
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js";

const saltRounds = 10;
export const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

export const matchPassword = (password,hash)=>{
  const result = bcrypt.compareSync(password, hash); 
  if(result){
    return 
  }
  else{
    throw new CustomErrorHandler("Enter Correct Credentail",httpStatusCodes["Bad Request"])
  }
}