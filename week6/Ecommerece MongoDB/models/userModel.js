import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, "Enter user_name"],
  },
  user_email: {
    type: String,
    unique: true,
    required: [true, "Enter user email-ID"]
  },
  password: {
    type: String,
    required: [true, "Set User password"]
  },
  role: {
    type: String,
    enum: ["Buyer", "Seller"],
    required: [true, "Enter your role"]
  }
}, {
  timestamps: true
})

const User = mongoose.model("User", userSchema)
export default User