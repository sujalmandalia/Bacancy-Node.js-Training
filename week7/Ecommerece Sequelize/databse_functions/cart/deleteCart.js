import Cart from "../../models/cartModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const deleteCart = async (id) => {
  try {
    const deleteCart = await Cart.destroy({ where: { id: id } })
    return deleteCart
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default deleteCart