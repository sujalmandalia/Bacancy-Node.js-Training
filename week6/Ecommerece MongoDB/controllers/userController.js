import Jwt from "jsonwebtoken"
import { hashPassword, matchPassword } from "../helper/hashPassword.js"
import sendResponse from "../helper/sendResponses.js"
import User from "../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js"

//GetUser
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").lean()
    return sendResponse(res, httpStatusCodes.OK, "success", "Get All Users", users)
  } catch (error) {
    return next(error)
  }
}

//Get Single User
const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean()
    return sendResponse(res, httpStatusCodes.OK, "success", "Get Single User", user)
  } catch (error) {
    return next(error)
  }
}

//Register User
const registerUser = async (req, res, next) => {
  try {
    const { password, ...data } = req.body;
    const hashed_password = hashPassword(password)
    const new_user = await User.create({ password: hashed_password, ...data })
    return sendResponse(res, httpStatusCodes.Created, "success", "Register User Successful", new_user)
  } catch (error) {
    return next(error)
  }
}

//Login User
const loginUser = async (req, res, next) => {
  try {
    const { password, user_email } = req.body
    if (!password || !user_email) {
      return next(new CustomErrorHandler("Enter Proper Crendetial", httpStatusCodes["Bad Request"]))
    }
    const requiredUser = await User.findOne({ user_email: user_email }).lean()
    matchPassword(password, requiredUser.password)
    const token = Jwt.sign({ _id: requiredUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    const data = {
      requiredUser,
      token
    }
    return sendResponse(res, httpStatusCodes.OK, "Login User Successful", data)
  } catch (error) {
    return next(error)
  }
}

//Update User
const updateUser = async (req, res, next) => {
  try {
    const data = req.body;
    const new_user = await User.findOneAndUpdate({ _id: req.user._id }, data, { new: true }).select("-password")
    return sendResponse(res, httpStatusCodes.OK, "success", "Update User Successful", new_user)
  } catch (error) {
    return next(error)
  }
}

//Delete User
const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.id })
    if (deleteUser.deletedCount === 0) {
      return next(new CustomErrorHandler("No User with the given ID", httpStatusCodes["Bad Request"]))
    } else {
      return sendResponse(res, httpStatusCodes.OK, "success", "Delete User Successful", { deletedCount: deleteUser.deletedCount })
    }
  } catch (error) {
    return next(error)

  }
}

export default {
  getAllUsers,
  getSingleUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}