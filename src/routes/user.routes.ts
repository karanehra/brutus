import { Router } from 'express'
import userController from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/login', userController.login)
userRouter.post('/signup', userController.signup)

export default userRouter
