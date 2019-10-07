import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['MASTER', 'USER', 'MANAGER'],
    required: true
  }
})

const User = model('User', userSchema)

export default User