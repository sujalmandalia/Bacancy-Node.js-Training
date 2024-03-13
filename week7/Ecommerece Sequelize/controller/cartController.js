import fetchSingleProduct from "../databse_functions/product/fetchSingleProduct.js"
import fetchSingleUser from "../databse_functions/user/fetchSingleUser.js"
import Cart from "../models/cartModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js"
import sendResponse from "../helper/sendResponse.js"
import addToCart from "../databse_functions/cart/addToCart.js"
import getCartItem from "../databse_functions/cart/getCartItems.js"
import findCart from "../databse_functions/cart/findCart.js"
import deleteCart from "../databse_functions/cart/deleteCart.js"

const addCartItems = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await fetchSingleUser(req.user.id)
    if (user.role !== 'Buyer') {
      return next(new CustomErrorHandler("You are not a buyer", httpStatusCodes.Forbidden))
    }
    const product = await fetchSingleProduct(id)
    const cart_item = await addToCart(id, req.user.id)
    return sendResponse(res, httpStatusCodes.Created, "success", "Add Cart", cart_item)
  } catch (error) {
    return next(error)
  }
}

const getCartItems = async (req, res, next) => {
  try {
    const user = await fetchSingleUser(req.user.id)
    if (user.role !== 'Buyer') {
      return next(new CustomErrorHandler("You are not a cart Owner", httpStatusCodes.Forbidden))
    }
    const cart_items = await getCartItem(req.user.id)
    // const cart_items = await Cart.findAll({ where: { cart_owner: req.user.id } })
    return sendResponse(res, httpStatusCodes.OK, "success", "Get Cart Items", cart_items)
  } catch (error) {
    return next(error)
  }
}

const deleteCartItem = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await fetchSingleUser(req.user.id)
    // if (user.role !== 'Buyer') {
    //   return next(new CustomErrorHandler("You are not a cart Owner", httpStatusCodes.Forbidden))
    // }
    // const cart = await Cart.findOne({ where: { id: id } })
    const cart = await findCart(id)
    if (cart.cart_owner !== user.id) {
      return next(new CustomErrorHandler("You can not delete cart", httpStatusCodes.Forbidden))
    }
    const delete_Cart = await deleteCart(id)
    return sendResponse(res,httpStatusCodes.OK,"success","Delete Cart",{delete_Cart})
  } catch (error) {
    return next(error)
  }
}

export default {
  addCartItems,
  getCartItems,
  deleteCartItem
}