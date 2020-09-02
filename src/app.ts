import Express from 'express'
import baseRouter from './routes/index'

const app = Express()

app.use(baseRouter)

app.listen(process.env.PORT, err => {
  if (err) return console.error(err)
  return console.info('Brutus Is Online...')
})

export default app
