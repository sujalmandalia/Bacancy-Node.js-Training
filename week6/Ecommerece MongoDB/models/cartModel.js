import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cart_items:{
    type:mongoose.ObjectId,
    ref:'Product'
  },
  cart_owner:{
    type:mongoose.ObjectId,
    ref:'User'
  }
},{
  timestamps:true,
})

const Cart = mongoose.model("Cart",cartSchema)
export default Cart;