import Cart from "../../models/cartModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const findCart = async (id) => {
  try {
    const cart = await Cart.findOne({ where: { id: id } })
    if (!cart) {
      return next(new CustomErrorHandler("Invalid CartId", httpStatusCodes["Bad Request"]))
    }
    return cart.toJSON()
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default findCart