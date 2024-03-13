import Product from "../../models/productModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"
import fetchSingleProduct from "./fetchSingleProduct.js"

const UpdateProduct = async (user_id, id,updatedValues) => {
  try {
    if (!id) {
      throw new CustomErrorHandler("Please Enter Id", httpStatusCodes["Bad Request"])
    }
    const product = await fetchSingleProduct(id)
    if (!product) {
      throw new CustomErrorHandler("No product with the given ID", httpStatusCodes["Bad Request"]);
    }
    if (product.product_seller !== user_id) {
      throw new CustomErrorHandler("You can not Update, You are not a seller of the product", httpStatusCodes.Forbidden)
    }
    const deleted_product = await Product.update(updatedValues,{
      where: { id: id },
      returning:true
    })
    return deleted_product
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default UpdateProduct