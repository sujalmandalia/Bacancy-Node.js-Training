import express from "express";
import controller from "../controllers/cartController.js";
import { requireLogin } from "../middleware/authMiddleware.js";

const router = express.Router()

router.get("/", requireLogin, controller.getCartItems)
router.post("/:id", requireLogin, controller.addCartItems)
router.delete("/:id", requireLogin, controller.deleteCartItem)
export default router