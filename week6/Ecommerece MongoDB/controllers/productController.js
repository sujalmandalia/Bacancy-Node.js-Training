import sendResponse from "../helper/sendResponses.js"
import Product from "../models/productModel.js"
import User from "../models/userModel.js"
import { CustomErrorHandler, httpStatusCodes } from "../utils/customErrorHandler.js"

// Get All Products
const getAllProducts = async (req, res, next) => {
  try {
    const perPage = 2;
    const { page } = req.query ? req.query : 1
    const products = await Product.find().skip((page - 1) * perPage).limit(perPage).lean().populate("product_seller", "-password").lean()
    return sendResponse(res, httpStatusCodes.OK, "success", "Get All Products", products)
  } catch (error) {
    next(error)
  }
}

// Get Single Product
const getSingleProduct = async (req, res, next) => {
  try {
    const required_product = await Product.findById(req.params.id).lean().populate("product_seller", "-password").lean()
    return sendResponse(res, httpStatusCodes.OK, "success", "Get Single Product", required_product)
  } catch (error) {
    return next(error)
  }
}

// Create Product
const createProduct = async (req, res, next) => {
  try {
    const { ...product_data } = req.body;
    const user = await User.findById(req.user._id).lean()
    if (user.role !== "Seller") {
      return next(new CustomErrorHandler("You are not A seller", httpStatusCodes.Forbidden))
    }
    const new_product = await Product.create({ product_seller: req.user._id, ...product_data });
    return sendResponse(res, httpStatusCodes.Created, "success", "Create Product", new_product)
  } catch (error) {
    return next(error)
  }
}

// Delete Product
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean()
    if (!product) {
      return next(new CustomErrorHandler("No product with the given ID", httpStatusCodes["Bad Request"]));
    }
    if (product.product_seller.toString() !== req.user._id) {
      return next(new CustomErrorHandler("You can not delete, You are not a seller of the product", httpStatusCodes.Forbidden))
    }
    const deleted_product = await Product.deleteOne({ _id: req.params.id })
    return sendResponse(res, httpStatusCodes.OK, "success", "Delete Product", { deletedCount: deleted_product.deletedCount })
  } catch (error) {
    return next(error)
  }
}

// Update Product
const updateProduct = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    const product = await Product.findById(req.params.id).lean()
    if (!product) {
      return next(new CustomErrorHandler("No product with the given ID", httpStatusCodes["Bad Request"]))
    }
    if (product.product_seller.toString() !== req.user._id) {
      return next(new CustomErrorHandler("You can not Update, You are not a seller of the product", httpStatusCodes.Forbidden))
    }
    const updated_product = await Product.findByIdAndUpdate({ _id: req.params.id }, { product_seller: req.user._id, ...data }, { new: true })
    return sendResponse(res, httpStatusCodes.OK, "success", "Update Product successful", updated_product)
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