/* eslint-disable object-curly-newline */
/* eslint-disable sort-imports */
/* eslint-disable import/extensions */
import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../Controller/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/add', createTask);
router.post('/delete/:id', deleteTask);
router.post('/update/:id', updateTask);

export default router;
