import express from "express"
import {getProductsFromSearch} from "./controller.js"

const searchProductsRouter = express.Router();

searchProductsRouter.get("/", getProductsFromSearch)

export {searchProductsRouter};