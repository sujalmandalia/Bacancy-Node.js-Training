/* eslint-disable sort-imports */
/* eslint-disable import/extensions */
import express from 'express';
import { loginUser, registerUser, testController } from '../Controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/test', authMiddleware, testController);

export default router;
