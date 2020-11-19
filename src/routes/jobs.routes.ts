import { Router } from 'express'
import asyncErrorHandler from '../middlewares/async'
import jobsController from '../controllers/jobs.controller'
import authenticationMiddleware from '../middlewares/auth'

const jobsRouter = Router()

jobsRouter.use(authenticationMiddleware)

jobsRouter.get('/', asyncErrorHandler(jobsController.list))
jobsRouter.post('/enqueue', asyncErrorHandler(jobsController.enqueue))
jobsRouter.get('/cancel/:jobID', asyncErrorHandler(jobsController.cancel))
jobsRouter.get('/requeue/:jobID', asyncErrorHandler(jobsController.requeue))

export default jobsRouter
