/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
import express from 'express';
import bookRoutes from './Routes/bookRoutes.js';

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1/books', bookRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
