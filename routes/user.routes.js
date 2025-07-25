import express, { Router } from "express"
import { register, login } from "../controllers/auth.controller.js"

const userRouter = express.Router()
userRouter.post("/register", register)
userRouter.post("/login", login)
export default userRouter