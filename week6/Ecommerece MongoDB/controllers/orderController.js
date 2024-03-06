import User from "../models/userModel.js"
import Cart from "../models/cartModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import sendResponse from "../helper/sendResponses.js"

const placeOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean()
    if (user.role === 'Seller') {
      return next(new CustomErrorHandler("You are Not a Buyer", httpStatusCodes.Forbidden))
    }

    const user_cart = await Cart.find({ cart_owner: req.user._id })
    const cartItemIds = user_cart.map(item => item.cart_items);
    const cart_products = await Product.find({ _id: { $in: cartItemIds } });

    if (cart_products.length === 0) {
      return next(new CustomErrorHandler("Your Cart Is empty", httpStatusCodes["Bad Request"]))
    }

    const order = await Order.create({ products: cart_products, buyer: req.user._id })

    await Cart.deleteMany({ cart_owner: req.user._id })

    return sendResponse(res, httpStatusCodes.Created, "success", "Place Order", order)
  } catch (error) {
    return next(error)
  }
}

const orderHistory = async (req, res, next) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
    const products = orders.map(item => item.products);
    const flatArray = products.flat()
    const productPrices = flatArray.map(product => product.product_price)
    const totalAmount = productPrices.reduce((acc, res) => {
      return acc + res
    })
    return sendResponse(res, httpStatusCodes.OK, "success", "Order History", { orders, totalAmount })
  } catch (error) {
    return next(error)

  }
}


export default {
  placeOrder,
  orderHistory
}