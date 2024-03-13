import createUser from "../databse_functions/user/createUser.js";
import DeleteUser from "../databse_functions/user/deleteUser.js";
import fetchSingleUser from "../databse_functions/user/fetchSingleUser.js";
import fetchUsers from "../databse_functions/user/fetchUsers.js";
import UpdateUser from "../databse_functions/user/updateUser.js";
import { hashPassword, matchPassword } from "../helper/password.js";
import sendResponse from "../helper/sendResponse.js";
import User from "../models/userModel.js"
import { httpStatusCodes } from "../utils/customErrorHandler.js";
import Jwt from "jsonwebtoken";

// Get All User
const getAllUser = async (req, res, next) => {
  try {
    const users = await fetchUsers()
    return sendResponse(res, httpStatusCodes.OK, "success", "Get All Users Successful", users)
  } catch (error) {
    return next(error)
  }
}

//Register User
const registerUser = async (req, res, next) => {
  try {
    // const { password, ...data } = req.body;
    // const hashed_password = hashPassword(password)
    // const new_user = await User.create({ password: hashed_password, ...data })
    const data = req.body
    const new_user = await createUser(data)
    return sendResponse(res, httpStatusCodes.Created, "success", "Register User Successful", new_user)
  } catch (error) {
    return next(error)
  }
}

//Login User
const loginUser = async (req, res, next) => {
  try {
    const { user_email, password } = req.body;
    if (!password || !user_email) {
      return next(new CustomErrorHandler("Enter Proper Crendetial", httpStatusCodes["Bad Request"]))
    }
    const user = await User.findOne({ where: { user_email: user_email } })
    matchPassword(password, user.password)
    const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" })
    const data = {
      user,
      token
    }
    return sendResponse(res, httpStatusCodes.OK, "Login User Successful", data)
  } catch (error) {
    return next(error)
  }
}

// Get Single user
const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await fetchSingleUser(id)
    return sendResponse(res, httpStatusCodes.OK, "success", "Get Single User", user)
  } catch (error) {
    return next(error)
  }
}

// Update User
const updateUser = async(req,res,next)=>{
  try {
    const {id} = req.user
    const data = req.body
    const user = await UpdateUser(id,data)  
    return sendResponse(res,httpStatusCodes.OK,"success","Update User",user)  
  } catch (error) {
    return next(error)
  }
}

// Delete User
const deleteUser = async(req,res,next)=>{
  try {
    const deleted_user = await DeleteUser(req.user.id)
    return sendResponse(res,httpStatusCodes["Bad Request"],"success","Delete User",{deleted_user})
  } catch (error) {
    return next(error)
  }
}

export default {
  getAllUser,
  registerUser,
  loginUser,
  getSingleUser,
  updateUser,
  deleteUser
}