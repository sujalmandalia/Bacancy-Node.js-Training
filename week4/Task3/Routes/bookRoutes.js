/* eslint-disable sort-imports */
/* eslint-disable import/extensions */
import express from 'express';
import adminMiddleware from '../../Task1/middlewares/middleware.js';
import {
  createBook, deleteBook, getAllBooks, getBookById, updateBook,
} from '../Controller/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllBooks);

router.get('/:id', authMiddleware, getBookById);

router.post('/', authMiddleware, adminMiddleware, createBook);

router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

router.put('/:id', authMiddleware, adminMiddleware, updateBook);
export default router;
