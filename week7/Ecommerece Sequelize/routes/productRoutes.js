import express from "express";
import controller from "../controller/productController.js";
import { requireLogin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/", requireLogin, controller.getAllProducts)
router.post("/", requireLogin, controller.createProduct)
router.get("/:id", requireLogin, controller.getSingleProduct)
router.delete("/:id", requireLogin, controller.deleteProduct)
router.put("/:id", requireLogin, controller.updateProduct)

export default router;