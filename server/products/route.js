import express from "express"
import { getAllProducts } from "./controller.js"

const productRouter = express.Router();

productRouter.get("/", getAllProducts)

export {productRouter};