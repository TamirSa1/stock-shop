import express from "express"
import {insertToCart, cartByUserID} from "./controller.js"

const cartRouter = express.Router();

cartRouter.post("/", insertToCart)

cartRouter.post("/getCart", cartByUserID)

export {cartRouter}; 
