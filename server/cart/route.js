import express from "express"
import {insertToCart, cartByUserID, deleteFromCart} from "./controller.js"

const cartRouter = express.Router();

cartRouter.post("/", insertToCart)

cartRouter.post("/getCart", cartByUserID)

cartRouter.delete("/:cartId", deleteFromCart)

export {cartRouter}; 
