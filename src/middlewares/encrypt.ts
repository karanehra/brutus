import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

const encryptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let key = process.env.AES_KEY
  let iv = crypto.randomBytes(8).toString('hex')
  let cipher = crypto.createCipheriv('aes-256-ctr', key, iv)
  let old = res.json
  res.json = function (data) {
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return old.call(this, { data: encrypted, iv: iv })
  }
  next()
}

const decryptionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.body).length > 0) {
    let key = process.env.AES_KEY
    let iv = req.body.iv
    let decipher = crypto.createDecipheriv('aes-256-ctr', key, iv)
    let decrypted = decipher.update(req.body.data, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    req.body = JSON.parse(decrypted)
  }
  next()
}
export { encryptionMiddleware, decryptionMiddleware }
