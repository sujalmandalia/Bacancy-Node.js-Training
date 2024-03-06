/* eslint-disable no-multiple-empty-lines */
/* eslint-disable import/order */
/* eslint-disable quotes */
/* eslint-disable import/extensions */
/* eslint-disable sort-imports */
import express from "express";
import UserRouter from "./routes/userRoutes.js";
import errorMiddleWare from "./middlewares/error.js";
import ErrorHandler from "./utils/errorHandler.js";
// import swaggerJSDoc from "swagger-jsdoc";
// import SwaggerUi from "swagger-ui-express";
// import options from "./utils/swaggerOptions.js";
// import swaggerFile from './swagger_output.json' assert { type: 'json' };
// import generateSwaggerDocs from './utils/swaggerConfig.js';

const app = express();
app.use(express.json());

const PORT = 8000;

// const specs = swaggerJSDoc(options)
// app.use('/doc', SwaggerUi.serve, SwaggerUi.setup(swaggerFile));

app.use('/api/v1/user', UserRouter);

// async function initialize() {
//   await generateSwaggerDocs(); // Generate Swagger docs
//   app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
// }

// initialize();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})

app.use((req, res, next) => {
  next(new ErrorHandler('Page Not Found', 404));
});


app.use(errorMiddleWare);
