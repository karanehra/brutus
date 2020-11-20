import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

const encryptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let key = process.env.AES_KEY
  let iv = crypto.randomBytes(16)
  let cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let old = res.json
  res.json = function (data) {
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return old.call(this, { data: encrypted, iv: iv.toString('hex') })
  }
  next()
}

export default encryptionMiddleware
