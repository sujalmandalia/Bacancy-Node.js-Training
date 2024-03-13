import { httpStatusCodes } from "../utils/customErrorHandler.js"
import sendResponse from "../helper/sendResponse.js"
import fetchAllProducts from "../databse_functions/product/fetchAllProducts.js"
import addProduct from "../databse_functions/product/addProduct.js"
import fetchSingleProduct from "../databse_functions/product/fetchSingleProduct.js"
import DeleteProduct from "../databse_functions/product/deleteProduct.js"
import UpdateProduct from "../databse_functions/product/updateProduct.js"

const getAllProducts = async (req, res, next) => {
  try {
    const products = await fetchAllProducts()
    return sendResponse(res, httpStatusCodes.OK, "success", "Get All Products", products)
  } catch (error) {
    return next(error)
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product_data = req.body;
    const new_product = await addProduct(req.user.id, product_data)
    return sendResponse(res, httpStatusCodes.Created, "success", "Create Product", new_product)
  } catch (error) {
    return next(error)
  }
}

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const required_product = await fetchSingleProduct(id)
    return sendResponse(res, httpStatusCodes.OK, "success", "Get Single Product", required_product)
  } catch (error) {
    return next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const delete_product = await DeleteProduct(req.user.id, id)
    return sendResponse(res, httpStatusCodes.OK, "success", "Delete Product", { delete_product })
  } catch (error) {
    return next(error)
  }
}

const updateProduct = async(req,res,next)=>{
  try {
    const {id} = req.params
    const data = req.body;
    const updated_product = await UpdateProduct(req.user.id,id,data)
    return sendResponse(res,httpStatusCodes.OK,"success","Update User",updated_product)
  } catch (error) {
    return next(error)
    
  }
}

export default {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct
}