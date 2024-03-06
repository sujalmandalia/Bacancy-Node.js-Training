/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
import express from 'express';
import { createUserController, deleteUserController, getUserById, getUserController, updateUserContoller } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUserController);
router.get('/:id', getUserById);
router.post('/', createUserController);
router.delete('/:id', deleteUserController);
router.put('/:id', updateUserContoller);
export default router;
