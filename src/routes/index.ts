import { Router } from 'express'
import userRouter from './user.routes'
import jobsRouter from './jobs.routes'
import encryptionMiddleware from '../middlewares/encrypt'

const baseRouter = Router()

baseRouter.use(encryptionMiddleware)
baseRouter.use('/user', userRouter)
baseRouter.use('/jobs', jobsRouter)

export default baseRouter
