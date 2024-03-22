import express from "express";
import mongoose from "mongoose";
import { createClient } from "redis";

const app = express()

app.use(express.json())

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://sujalmandalia:sujal@cluster0.jhdewtb.mongodb.net/Redis-practice")
    console.log("Database connected Successfully");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    })
  } catch (error) {
    console.error("Error in connection to MongDB", error);
  }
}
connect()
const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number
  }
})
const User = mongoose.model("User", UserSchema)

const cacheMiddleware = async (req, res, next) => {
  let cachedData
  if (req.params.id) {
    cachedData = await client.get(`user/${req.params.id}`)
  }
  else{
    cachedData = await client.get("users")
  } 
  if (cachedData) {
    const data = JSON.parse(cachedData)
    console.log("Redis cache");
    return res.status(200).json(data)
  }
  else {
    next()
  }
}

app.get("/users", cacheMiddleware, async (req, res) => {
  try {
    const users = await User.find().lean();
    client.setEx('users', 360, JSON.stringify(users))
    console.log("MongoDB database");
    return res.status(200).json(users)
  } catch (error) {
    console.error("Error");
    res.status(500).json(error)
  }
})
app.get("/users/:id", cacheMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).lean();
    client.setEx(`user/${id}`, 360, JSON.stringify(user))
    console.log("MongoDB database");
    return res.status(200).json(user)
  } catch (error) {
    console.error("Error");
    res.status(500).json(error.message)
  }
})

app.post("/users", async (req, res) => {
  try {
    const data = req.body
    const user = await User.create(data);
    client.del('users')
    return res.status(201).json(user)
  } catch (error) {
    console.error("Error");
    res.status(500).json(error)
  }
})

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const user = await User.findByIdAndUpdate(id, data, { new: true })
    client.del("users")
  } catch (error) {
    console.error("Error");
    res.status(500).json(error.message)
  }
})

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    client.del("users")
  } catch (error) {
    console.error("Error");
    res.status(500).json(error.message)
  }
})

