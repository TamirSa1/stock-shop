import express from "express";
import { userLogin } from "./controller.js";

const loginRouter = express.Router();

loginRouter.post("/", userLogin);


export {loginRouter}