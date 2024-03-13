import Product from "../../models/productModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"

const fetchSingleProduct = async (id) => {
  try {
    if (!id) {
      throw new CustomErrorHandler("Please Enter ID", httpStatusCodes["Bad Request"])
    }
    const data = await Product.findByPk(id)
    // console.log((await data.getUser()).toJSON())
    if (!data) {
      throw new CustomErrorHandler("Not Valid Product", httpStatusCodes["Bad Request"])
    }
    return data.toJSON()
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Gateway"])

  }
}

export default fetchSingleProduct