import express from "express";
import controller from "../controller/cartController.js";
import { requireLogin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/", requireLogin, controller.getCartItems)
router.post("/:id", requireLogin, controller.addCartItems)
router.delete("/:id", requireLogin, controller.deleteCartItem)


export default router