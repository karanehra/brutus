import { Router } from 'express'
import userController from '../controllers/user.controller'
import asyncErrorHandler from '../middlewares/async'

const userRouter = Router()

userRouter.post('/login', asyncErrorHandler(userController.login))
userRouter.post('/signup', asyncErrorHandler(userController.signup))

export default userRouter
