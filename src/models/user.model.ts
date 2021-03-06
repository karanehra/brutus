import { Schema, model, Document } from 'mongoose'
import { USER_TYPE } from '../constants/enums'

interface iUser extends Document {
  firstName: String
  lastName: String
  email: String
  passwordHash: String
  userType: String
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      match: /^[a-z]+$/i,
    },
    lastName: {
      type: String,
      match: /^[a-z]+$/i,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: Object.keys(USER_TYPE),
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

const User = model<iUser>('User', userSchema)

export default User
