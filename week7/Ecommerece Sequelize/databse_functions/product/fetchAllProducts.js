import Product from "../../models/productModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const fetchAllProducts = async () => {
  try {
    const data = await Product.findAll({ paranoid: false })

    if (!data.length) {
      throw new CustomErrorHandler("No data Found", httpStatusCodes["Bad Request"])
    }
    return data
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default fetchAllProducts