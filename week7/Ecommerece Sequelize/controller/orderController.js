import fetchSingleUser from "../databse_functions/user/fetchSingleUser.js"
import { sequelize } from "../config/dbConfig.js"
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js";
import OrderProduct from "../models/orderProduct.js";
import sendResponse from "../helper/sendResponse.js"
import Product from "../models/productModel.js";
import fetchSingleProduct from "../databse_functions/product/fetchSingleProduct.js";

const placeOrder = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const user = await fetchSingleUser(req.user.id)
    if (user.role === 'Seller') {
      return next(new CustomErrorHandler("You are Not a Buyer", httpStatusCodes.Forbidden))
    }
    const user_cart = await Cart.findAll({ where: { cart_owner: req.user.id }, raw: true })
    if (user_cart.length === 0) {
      return next(new CustomErrorHandler("Your Cart Is Empty", httpStatusCodes["Bad Request"]))
    }
    console.log(user_cart);
    const order = await Order.create({ buyer: req.user.id }, { transaction: t })

    const cart_item = user_cart.map(async (item) => {
      await OrderProduct.create({ orderId: order.id, productId: item.cart_items }, { transaction: t })
    })

    await Cart.destroy({ where: { cart_owner: req.user.id } }, { transaction: t })

    await t.commit()
    return sendResponse(res, httpStatusCodes.Created, "success", "Place Order", order)
  } catch (error) {
    await t.rollback()
    return next(error)
  }
}

const orderHistory = async (req, res, next) => {
  try {
    const { id } = req.params
    const orders = await Order.findAll({
      where: { buyer: req.user.id,id:id }, raw: true,
      attributes: { exclude: ['createdAt', 'deletedAt', 'updatedAt'] },
      include: {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        through: { attributes: [] }
      }
    })
    const orderProduct = await OrderProduct.findAll({
      where: {
        orderId: id
      },
      raw: true
    })
    const productIds = orderProduct.map((item) => {
      return item.productId
    })
    const products = await Product.findAll({
      where: {
        id: productIds
      },
      raw: true
    });
    const product_price = products.map((product) => {
      return product.product_price
    })
    const totalAmount = product_price.reduce((acc, curr) => {
      return parseInt(acc) + parseInt(curr)
    }, 0)
    return sendResponse(res, httpStatusCodes.OK, "success", "Order History", { data: orders, totalAmount })
  } catch (error) {
    return next(error)
  }
}

export default {
  placeOrder,
  orderHistory
}