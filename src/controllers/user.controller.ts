import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).lean()

  const hasher = crypto.createHash('sha256')
  hasher.update(password)

  if (user.passwordHash === hasher.digest('hex')) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '30s',
    })

    delete user.passwordHash

    res.status(200).send({
      message: '',
      data: { ...user, token },
    })
  } else {
    res.status(401).send({ message: 'Inorrect Credentials' })
  }
}

const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, userType } = req.body

  if (!password) {
    return res.status(400).send({ message: 'Field password is missing' })
  }

  const hasher = crypto.createHash('sha256')
  hasher.update(password)

  const data = await User.create({
    firstName,
    lastName,
    userType,
    email,
    passwordHash: hasher.digest('hex'),
  })

  delete data.passwordHash

  res.status(201).send({ message: 'Created New User', data })
}

export default { login, signup }
