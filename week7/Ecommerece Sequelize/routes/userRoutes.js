import express, { Router } from "express";
import controller from "../controller/userController.js";
import { requireLogin } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/", requireLogin, controller.getAllUser)
router.post("/login", controller.loginUser)
router.get("/:id", requireLogin, controller.getSingleUser)
router.post("/", controller.registerUser)
router.put("/", requireLogin, controller.updateUser)
router.delete("/", requireLogin, controller.deleteUser)

export default router