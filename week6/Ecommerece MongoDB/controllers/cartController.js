import sendResponse from "../helper/sendResponses.js"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js"

// Get Cart items
const getCartItems = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean()
    if (user.role === 'Seller') {
      return next(new CustomErrorHandler("You are not a cart owner", httpStatusCodes.Forbidden))
    }
    const cart_items = await Cart.find({ cart_owner: req.user._id }).populate('cart_owner', '-password -role -createdAt -updatedAt -__v').populate('cart_items', '-createdAt -updatedAt -__v')
    return sendResponse(res, httpStatusCodes.OK, "success", "Get Cart Items", cart_items)
  } catch (error) {
    return next(error)
  }
}

//Add Cart items
const addCartItems = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean()
    if (product === null) {
      return next(new CustomErrorHandler("Not a Valid Product", httpStatusCodes["Bad Request"]))
    }
    const user = await User.findById(req.user._id).lean()
    if (user.role !== 'Buyer') {
      return next(new CustomErrorHandler("You are not a buyer", httpStatusCodes.Forbidden))
    }
    const cart_item = await Cart.create({ cart_items: req.params.id, cart_owner: req.user._id })
    return sendResponse(res, httpStatusCodes.OK, "success", "Add Cart Item", cart_item)
  } catch (error) {
    return next(error)
  }
}

//Delete Cart Item
const deleteCartItem = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean()
    if (user.role === 'Seller') {
      return next(new CustomErrorHandler("You are not a cart owner", httpStatusCodes.Forbidden))
    }
    const cart_item = await Cart.findById(req.params.id).lean()
    if (cart_item.cart_owner.toString() !== user._id.toString()) {
      return next(new CustomErrorHandler("You can not delete cart", httpStatusCodes.Forbidden))
    }
    const deleted_cart = await Cart.deleteOne({_id:req.params.id})
    return sendResponse(res, httpStatusCodes.OK, "success", "Delete Cart Item", { deleted_count: deleted_cart.deletedCount })
  } catch (error) {
    return next(error)
  }
}

export default {
  getCartItems,
  addCartItems,
  deleteCartItem
}