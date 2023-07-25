import express from "express";
import {createUserToMongoDB} from "./controller.js";

const signUpRouter = express.Router();

signUpRouter.post("/", createUserToMongoDB)

export {signUpRouter};