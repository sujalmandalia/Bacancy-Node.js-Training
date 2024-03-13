import { hashPassword } from "../../helper/password.js";
import User from "../../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const createUser = async (data) => {
  try {
    const { password, ...user_data } = data;
    const hashed_password = hashPassword(password)
    const new_user = await User.create({ password: hashed_password, ...user_data })
    if (!new_user) {
      throw new CustomErrorHandler("Invalid Data", httpStatusCodes["Bad Request"])
    }
    return new_user.toJSON()
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes['Bad Request'])
  }
}

export default createUser