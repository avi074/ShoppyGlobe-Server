import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"

const userRouter = Router()

// register a user
userRouter.post('/register', registerUser)

// login a user
userRouter.post('/login', loginUser)

export default userRouter