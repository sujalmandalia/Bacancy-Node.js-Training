import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: ["true", "Please Add product name"]
  },
  product_price: {
    type: Number,
    required: ["true", "Add Product price"],
    min: 0
  },
  product_seller: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: ["true", "Add Product seller"],
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)
export default Product;