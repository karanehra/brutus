import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email) return res.status(400).send({ message: 'Email Missing' })
  if (!password) return res.status(400).send({ message: 'Password Missing' })

  const user = await User.findOne({ email }).lean()

  if (!user) return res.status(400).send({ message: 'User Not Found' })

  const hasher = crypto.createHash('sha256')
  hasher.update(password)

  if (user.passwordHash === hasher.digest('hex')) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
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
