import  express  from "express";
import controller from "../controller/orderController.js";
import {requireLogin} from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/",requireLogin, controller.placeOrder)
router.get("/:id",requireLogin, controller.orderHistory)

export default router;