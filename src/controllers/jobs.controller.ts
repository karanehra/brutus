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
  const { jobID } = req.params

  await Job.updateOne({ _id: jobID }, { status: JOB_STATUS.CANCELED })

  res.status(200).json({ message: 'Job Dequeued' })
}

const requeue = async (req: Request, res: Response) => {
  const { jobID } = req.params

  await Job.findByIdAndUpdate(jobID, { status: JOB_STATUS.QUEUED })

  res.status(200).json({ message: 'Job Queued' })
}

//put below controllers in other router

const uploadRssFeeds = async (req: Request, res: Response) => {
  let { feeds } = req.body.uploadRssFeeds
  feeds = feeds.replace(/ /g, '|')

  const feedData = feeds.split('|')

  //add job for

  res.status(200).json({ message: 'Received Feed Addition Request' })
}

const getRssFeeds = async (req: Request, res: Response) => {
  res.status(200).json({ data: [], message: 'Ok' })
}

export default { list, enqueue, cancel, requeue, uploadRssFeeds, getRssFeeds }
