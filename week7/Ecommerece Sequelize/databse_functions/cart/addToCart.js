import Cart from "../../models/cartModel.js"
import User from "../../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const addToCart = async (product_id, owner_id) => {
  try {
    if (!product_id || !owner_id) {
      throw new CustomErrorHandler("Enter Id", httpStatusCodes["Bad Request"])
    }
    const cart_item = await Cart.create({ cart_items: product_id, cart_owner: owner_id })
    if(!cart_item){
      throw new CustomErrorHandler("Invalid Id", httpStatusCodes["Bad Request"])
    }
    return cart_item.toJSON()
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default addToCart