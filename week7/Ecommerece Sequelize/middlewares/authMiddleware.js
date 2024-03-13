import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js"
import Jwt from "jsonwebtoken"

export const requireLogin = async (req, res, next) => {
  try {
    const decode = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    req.user = decode;
    next();
  } catch (error) {
    return next(new CustomErrorHandler("Not Authorized", httpStatusCodes.Unauthorized))
  }
}

export const isAdmin = async (req, res, next) => {
  const role = req.headers.role;
  if (role && role.toLowerCase() === "admin") {
    return next()
  }
  else {
    return next(new CustomErrorHandler("Not A admin", httpStatusCodes.Forbidden))
  }
}
export const isSeller = async (req, res, next) => {
  const role = req.headers.role;
  if (role && role.toLowerCase() === "seller") {
    return next()
  }
  else {
    return next(new CustomErrorHandler("Not A Seller", httpStatusCodes.Forbidden))
  }
}