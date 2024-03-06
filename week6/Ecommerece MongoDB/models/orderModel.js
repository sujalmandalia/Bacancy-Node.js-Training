import mongoose from "mongoose"
import { productSchema } from "./productModel.js";


const orderSchema = new mongoose.Schema({
  products: [productSchema],
  buyer: {
    type: mongoose.ObjectId,
    ref: 'User'
  }
})

const Order = mongoose.model('Order', orderSchema);

export default Order