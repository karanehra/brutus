import { Request, Response } from 'express'

const login = async (req: Request, res: Response) => {
  res.send('Hello login')
}

export default { login }
