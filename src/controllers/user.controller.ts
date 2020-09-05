import { Request, Response } from 'express'
import crypto from 'crypto'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'

const login = async (req: Request, res: Response) => {
  let hasher = crypto.createHash('sha256')
  const { email, password } = req.body
  let user = await User.findOne({ email })
  hasher.update(password)
  if (user.passwordHash === hasher.digest('hex')) {
    let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    })
    res.status(200).send({
      message: '',
      data: user,
      token,
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
  let hasher = crypto.createHash('sha256')
  hasher.update(password)
  let data = await User.create({
    firstName,
    lastName,
    userType,
    email,
    passwordHash: hasher.digest('hex'),
  })
  res.status(201).send({ message: 'Created New User', data })
}

export default { login, signup }
