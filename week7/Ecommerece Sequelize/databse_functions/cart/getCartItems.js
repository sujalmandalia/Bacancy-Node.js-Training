import Cart from "../../models/cartModel.js"
import Product from "../../models/productModel.js"
import User from "../../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const getCartItem = async (owner_id) => {
  try {
    const cart_items = await Cart.findAll({
      where: { cart_owner: owner_id },
      include: [
        // {
        //   model: User,
        //   as:'buyer',
        //   attributes: { exclude: ["password", "user_email", "createdAt", "updatedAt"] },
        // },
        {
          model: Product,
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }
      ],
    })
    if (!cart_items) {
      throw new CustomErrorHandler("Invalid Id", httpStatusCodes["Bad Request"])
    }
    return cart_items
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default getCartItem