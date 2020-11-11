import { Request, Response } from 'express'
import Job from '../models/job.model'
import { JOB_STATUS } from '../constants/enums'

const list = async (req: Request, res: Response) => {
  const data = await Job.find()

  res.status(200).json({ data, message: 'OK' })
}

const enqueue = async (req: Request, res: Response) => {
  const { name } = req.body

  await Job.create({ name, status: JOB_STATUS.QUEUED })

  res.status(200).json({ message: 'Job Queued' })
}

const cancel = async (req: Request, res: Response) => {
  const { jobID } = req.query

  await Job.findByIdAndUpdate(jobID, { status: JOB_STATUS.CANCELED })

  res.status(200).json({ message: 'Job Dequeued' })
}

const requeue = async (req: Request, res: Response) => {
  const { jobID } = req.query

  await Job.findByIdAndUpdate(jobID, { status: JOB_STATUS.QUEUED })

  res.status(200).json({ message: 'Job Queued' })
}

export default { list, enqueue, cancel, requeue }
