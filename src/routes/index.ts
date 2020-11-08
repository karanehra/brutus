import { Router } from 'express'
import userRouter from './user.routes'
import jobsRouter from './jobs.routes'

const baseRouter = Router()

baseRouter.use('/user', userRouter)
baseRouter.use('/jobs', jobsRouter)

export default baseRouter
