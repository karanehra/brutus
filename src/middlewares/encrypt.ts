import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

const encryptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let old = res.json
  res.json = data => {
    console.log(data)
    return old.call(data)
  }
  let key = process.env.AES_KEY
  let iv = crypto.randomBytes(16)
  let cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let encrypted = cipher.update(req.url, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  console.log(key, encrypted)
  next()
}

export default encryptionMiddleware
