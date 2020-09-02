import { Router } from 'express'
import userRouter from './user.routes'

const baseRouter = Router()

baseRouter.use('/user', userRouter)

export default baseRouter
