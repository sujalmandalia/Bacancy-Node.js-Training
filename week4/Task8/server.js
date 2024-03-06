/* eslint-disable quotes */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
import express from "express";
import taskRouter from "./Routes/taskRoutes.js";
import errorMiddleWare from "./middleware/errorMiddleware.js";
import ErrorHandler from "./utils/customErrorHandler.js";

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.set('view engine', 'ejs');

const PORT = 8000;
app.use('/api/v1/tasks', taskRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// error handler when request is made to unknown routes
app.use((req, res, next) => {
  next(new ErrorHandler("Page Not Found", 404))
});

// global error handler
app.use(errorMiddleWare);
