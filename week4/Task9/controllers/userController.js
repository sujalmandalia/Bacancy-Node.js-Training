/* eslint-disable quotes */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable eol-last */
/* eslint-disable semi */
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ErrorHandler from "../utils/errorHandler.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, '../users.json');

//get User
export const getUserController = async (req, res, next) => {
  try {
    const users = JSON.parse(await fs.promises.readFile(path))
    return res.json({
      statuscode: 200,
      message: "Get Users Successfull",
      data: users
    })
  } catch (error) {
    return next(error)
  }
}

//get User By Id
export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = JSON.parse(await fs.promises.readFile(path))
    const requiredUser = users.filter((user) => {
      return id === user.id
    })
    if (requiredUser.length === 0 || requiredUser === undefined)
      return next(new ErrorHandler("No user Found With the given ID", 404))
    return res.json({
      statusCode: 200,
      message: 'Get User By ID successfull',
      data: requiredUser,
    })
  } catch (error) {
    return next(error)
  }
}

// Create User
export const createUserController = async (req, res, next) => {
  try {
    let id = uuidv4();
    const users = JSON.parse(await fs.promises.readFile(path))
    const { name, age } = req.body
    if (name === undefined || name.length === 0 || ! /^[A-Za-z]+$/.test(name)) {
      return next(new ErrorHandler("Enter valid name", 400))
    }
    if (age === undefined || age < 0 || typeof (age) !== "number") {
      return next(new ErrorHandler("Enter Proper Age", 400))
    }
    users.push({
      id,
      name: name,
      age: age
    });
    await fs.promises.writeFile(path, JSON.stringify(users))
    return res.status(201).json({
      statusCode: 201,
      message: "User Added Successfully",
      user_id: id
    })
  } catch (error) {
    return next(error)
  }
}

// Delete User
export const deleteUserController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = JSON.parse(await fs.promises.readFile(path))
    const users = data.filter((user) => {
      return id !== user.id;
    })
    if (users.length === data.length) {
      return next(new ErrorHandler("No user Found With the given ID", 404));
    }
    await fs.promises.writeFile(path, JSON.stringify(users))
    return res.json({
      statusCode: 200,
      message: "User Deleted Successfully"
    })
  } catch (error) {
    return next(error)
  }
}

// Update User
export const updateUserContoller = async (req, res, next) => {
  try {
    let flag = 0
    const id = req.params.id;
    const { name, age } = req.body;
    if (name === undefined || name.length === 0 || ! /^[A-Za-z]+$/.test(name)) {
      return next(new ErrorHandler("Enter valid name", 400))
    }
    if (age === undefined || age < 0) {
      return next(new ErrorHandler("Enter Proper Age", 400))
    }
    let data = JSON.parse(await fs.promises.readFile(path))
    data = data.map((user) => {
      if (user.id === id) {
        flag = 1;
        user = { id: id, ...req.body }
      }
      return user;
    })
    if (!flag) {
      return next(new ErrorHandler("No such user with the given ID", 404))
    }
    await fs.promises.writeFile(path, JSON.stringify(data))
    return res.status(200).json({
      statuscode: 200,
      message: "User Updated Successfully"
    })
  } catch (error) {
    return next(error)
  }
}