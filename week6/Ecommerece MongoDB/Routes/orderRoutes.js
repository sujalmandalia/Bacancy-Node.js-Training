import  express  from "express";
import controller from "../controllers/orderController.js";
import {requireLogin} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/",requireLogin, controller.placeOrder)
router.get("/",requireLogin, controller.orderHistory)

export default router;