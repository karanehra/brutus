import { Request, Response } from 'express'

const login = async (req: Request, res: Response) => {
  res.send('Hello login')
}

const signup = async (req: Request, res: Response) => {
  res.send('hello signup')
}

export default { login, signup }
