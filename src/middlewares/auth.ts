import { Request, Response, NextFunction } from 'express'

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('COMING from auth Mw')
  next()
}

export default authenticationMiddleware
