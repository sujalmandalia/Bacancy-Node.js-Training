import Product from "../../models/productModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../../utils/customErrorHandler.js"
import fetchSingleProduct from "./fetchSingleProduct.js"

const DeleteProduct = async (user_id, id) => {
  try {
    console.log(id);
    if (!id) {
      throw new CustomErrorHandler("Please Enter Id", httpStatusCodes["Bad Request"])
    }
    const product = await fetchSingleProduct(id)
    console.log(product);
    if (!product) {
      throw new CustomErrorHandler("No product with the given ID", httpStatusCodes["Bad Request"]);
    }
    if (product.product_seller !== user_id) {
      throw new CustomErrorHandler("You can not delete, You are not a seller of the product", httpStatusCodes.Forbidden)
    }
    const deleted_product = await Product.destroy({
      where: { id: id }
    })
    return deleted_product
  } catch (error) {
    throw new CustomErrorHandler(error.message, httpStatusCodes["Bad Request"])
  }
}

export default DeleteProduct