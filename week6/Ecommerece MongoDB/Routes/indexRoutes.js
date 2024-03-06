import  express  from "express";
import userRoutes from "./userRoutes.js"
import productRoutes from "./productRoutes.js"
import cartRoutes from "./cartRoutes.js"
import orderRoutes from "./orderRoutes.js"
const router = express.Router()


router.use("/users",userRoutes)
router.use("/products",productRoutes)
router.use("/cart",cartRoutes)
router.use("/order",orderRoutes)


export default router;