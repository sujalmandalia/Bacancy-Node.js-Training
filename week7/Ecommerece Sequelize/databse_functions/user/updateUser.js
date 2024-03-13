import User from "../../models/userModel.js"
import { CustomErrorHandler } from "../../utils/customErrorHandler.js"

const UpdateUser = async (id, updatedValues) => {
  try {
    if (!id) {
      throw new CustomErrorHandler("Please Enter ID", httpStatusCodes["Bad Request"])
    }
    const data = await User.update(updatedValues,
      {
        where: { id: id },
      })
    if (!data[0]) {
      throw new CustomErrorHandler("Invalid ID", httpStatusCodes["Bad Request"])
    }
    return data
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}
export default UpdateUser