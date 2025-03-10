// | import express
import express from "express";

// | import productControllers
import { productTestController } from "../controllers/procuctControllers.js";

// @ Define productRouter
const productRouter = express.Router();

// ` Configure productRoute
productRouter.get("/test", productTestController);

// + Add Product
productRouter.post("/addproduct");

// ~ Export productRouter
export default productRouter;
