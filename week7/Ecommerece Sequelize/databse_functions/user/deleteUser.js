import User from "../../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const DeleteUser = async (id) => {
  try {
    const data = await User.destroy({ where: { id: id } })
    return data
  } catch (error) {
    throw new CustomErrorHandler(error.message,httpStatusCodes["Bad Request"])
    
  }
}

export default DeleteUser