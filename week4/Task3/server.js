/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
import express from 'express';
import authRoutes from './Routes/authRoutes.js';
import bookRoutes from './Routes/bookRoutes.js';

const app = express();
const PORT = 8000;
app.use(express.json());

app.use('/api/v1/users', authRoutes);
app.use('/api/v1/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
