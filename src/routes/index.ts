import { Router } from 'express'
import userRouter from './user.routes'
import jobsRouter from './jobs.routes'
import { encryptionMiddleware, decryptionMiddleware } from '../middlewares/encrypt'

const baseRouter = Router()

baseRouter.use(encryptionMiddleware)
baseRouter.use(decryptionMiddleware)

baseRouter.use('/user', userRouter)
baseRouter.use('/jobs', jobsRouter)

export default baseRouter
