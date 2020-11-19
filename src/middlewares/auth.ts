import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send({ message: 'Auth Token missing' })
  }
  const token = authorization.split(' ')[1]

  if (token) {
    try {
      const { exp, ...claims } = jwt.verify(token, process.env.JWT_SECRET) as any
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return res.status(401).send({ message: 'Auth Token expired' })
      } else {
        return res.status(401).send({ message: 'Auth Token invalid' })
      }
    }
  }
  next()
}

export default authenticationMiddleware
