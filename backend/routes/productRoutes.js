import express from "express";
import { productTestController } from "../controllers/procuctControllers.js";

const productRoutes = express.Router();

productRoutes.get("/test", productTestController);

export default productRoutes;
