import { sequelize } from "../../config/dbConfig.js"
import Product from "../../models/productModel.js"
import User from "../../models/userModel.js";
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"


const addProduct = async (user_id, product_data) => {
  const t = await sequelize.transaction();
  try {
    const user = await User.findByPk(user_id)
    // console.log(user.toJSON);
    if (user.role !== "Seller") {
      return next(new CustomErrorHandler("You are not A seller", httpStatusCodes.Forbidden))
    }
    const new_product = await Product.create({ product_seller: user_id, ...product_data }, { transaction: t })
    await new_product.setUser(user, { transaction: t })
    if (!new_product) {
      await t.rollback()
      throw new CustomErrorHandler("Invalid Data", httpStatusCodes["Bad Request"])
    }
    await t.commit()
    return new_product.toJSON()
  } catch (error) {
    await t.rollback()
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default addProduct