/* eslint-disable import/order */
/* eslint-disable quotes */
/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
import express from "express";
import UserRouter from "./routes/userRoutes.js";
import errorMiddleWare from "./middlewares/error.js";
import ErrorHandler from "./utils/errorHandler.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/v1/user', UserRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})

app.use((req, res, next) => {
  next(new ErrorHandler('Page Not Found', 404));
});

app.use(errorMiddleWare);
