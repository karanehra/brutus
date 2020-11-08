import { Request, Response, NextFunction } from 'express'
/**
 * Catches all application wide async errors and `catches` them so that
 * the global error function can handle them
 */
const asyncErrorHandler = (func: Function) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(func(req, res, next)).catch(next)
}
export default asyncErrorHandler
