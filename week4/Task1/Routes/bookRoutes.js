/* eslint-disable sort-imports */
/* eslint-disable import/extensions */
import express from 'express';
import {
  createBook, deleteBook, getAllBooks, getBookById, updateBook,
} from '../Controller/bookController.js';
import adminMiddleware from '../middlewares/middleware.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);

router.post('/', adminMiddleware, createBook);

router.delete('/:id', adminMiddleware, deleteBook);

router.put('/:id', adminMiddleware, updateBook);

export default router;
