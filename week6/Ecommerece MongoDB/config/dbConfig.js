
import mongoose from "mongoose";


const connectDB = async()=>{
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jhdewtb.mongodb.net/Ecommerce`)
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;