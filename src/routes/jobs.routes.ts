import { Router } from 'express'
import asyncErrorHandler from '../middlewares/async'
import jobsController from '../controllers/jobs.controller'

const jobsRouter = Router()

jobsRouter.get('/', asyncErrorHandler(jobsController.list))
jobsRouter.post('/enqueue', asyncErrorHandler(jobsController.enqueue))
jobsRouter.get('/cancel/:jobID', asyncErrorHandler(jobsController.cancel))
jobsRouter.post('/requeue/:jobID', asyncErrorHandler(jobsController.requeue))

export default jobsRouter
