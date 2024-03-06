import  express  from "express";
import controller from "../controllers/userController.js"
import { isAdmin, requireLogin } from "../middleware/authMiddleware.js";
const router = express.Router()

router.get("/",requireLogin,isAdmin,controller.getAllUsers)
router.get("/login",controller.loginUser)
router.get("/:id",requireLogin,isAdmin,controller.getSingleUser)
router.post("/",controller.registerUser)
router.put("/", requireLogin, controller.updateUser)
router.delete("/:id", requireLogin, isAdmin,controller.deleteUser)


export default router