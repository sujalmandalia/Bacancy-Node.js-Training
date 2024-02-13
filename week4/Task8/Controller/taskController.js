
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ErrorHandler from '../utils/customErrorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = join(__dirname, '../task.json');
let tasks = [];


export const getAllTasks = async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.promises.readFile(path))
    tasks = data;
    return res.render('index', { tasks: tasks })
  } catch (error) {
    // return next(new ErrorHandler("Problem in path", 500)) // use of custom error
    return next(error)
  }
}

export const createTask = async (req, res, next) => {
  try {
    const newTask = req.body.task;
    const data = JSON.parse(await fs.promises.readFile(path))
    tasks = data;
    tasks.push({
      id: uuidv4(),
      task: newTask
    })
    fs.writeFile(path, JSON.stringify(tasks), (err) => {
      if (err) {
        return next(err)
      }
    })
    return res.redirect('/api/v1/tasks');
  } catch (error) {
    return next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = JSON.parse(await fs.promises.readFile(path))
    tasks = data;
    tasks = tasks.filter((task) => {
      return task.id !== id
    })
    fs.writeFile(path, JSON.stringify(tasks), (err) => {
      if (err) {
        return next(err)
      }
      return res.redirect('/api/v1/tasks');
    })
  } catch (error) {
    return next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body.updatedTask;
    const data = JSON.parse(await fs.promises.readFile(path))
    tasks = data;
    tasks.map((task) => {
      if (task.id === id) {
        task.task = updatedTask;
      }
    })
    fs.writeFile(path, JSON.stringify(tasks), (err) => {
      if (err) {
        return next(err)
      }
    })
    return res.redirect('/api/v1/tasks');
  } catch (error) {
    next(error)
  }
}