import { Schema, model, Document } from 'mongoose'
import { JOB_STATUS } from '../constants/enums'

interface iJob extends Document {
  name: String
  status: JOB_STATUS
}

const jobSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(JOB_STATUS),
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
)

const Job = model<iJob>('Job', jobSchema)

export default Job
