import express from "express"
import {insertToCart, cartByUserID, deleteFromCart, declineCart} from "./controller.js"

const cartRouter = express.Router();

cartRouter.post("/", insertToCart)

cartRouter.put("/", declineCart)

cartRouter.post("/getCart", cartByUserID)

cartRouter.delete("/:cartId", deleteFromCart)

export {cartRouter}; 
