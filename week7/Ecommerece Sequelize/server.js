import express from "express";
import indexRoutes from "./Routes/indexRoutes.js"
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { CustomErrorHandler, httpStatusCodes } from "./utils/customErrorHandler.js";
import dotenv from 'dotenv'
import morgan from "morgan";
import { connect } from "./config/dbConfig.js";
import { syncTables } from "./models/relations.js";

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

dotenv.config();
connect();

await syncTables()

app.use("/api/v1", indexRoutes);


app.use('*', (req, res, next) => {
  next(new CustomErrorHandler("Not found", httpStatusCodes["Not Found"]))
})

app.use(errorMiddleware)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in running on port ${process.env.PORT}`);
})