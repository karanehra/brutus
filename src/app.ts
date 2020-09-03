import Express from 'express'
import bodyParser from 'body-parser'
import baseRouter from './routes/index'

const app = Express()
app.use(bodyParser.json())

app.use(baseRouter)

app.use((err: Error, req, res, next) => {
  console.log('test:', err)
  res.status(500).send(err)
  next()
})

let server = app.listen(process.env.PORT, err => {
  if (err) return console.error(err)
  return console.info('Brutus Is Online...')
})

export { app, server }
