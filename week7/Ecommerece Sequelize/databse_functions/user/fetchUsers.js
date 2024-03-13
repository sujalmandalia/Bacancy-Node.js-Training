import User from "../../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const fetchUsers = async () => {
  try {
    const data = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    if (!data.length) {
      throw new CustomErrorHandler("No Data Found", httpStatusCodes["Bad Request"])
    }
    return data
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default fetchUsers
