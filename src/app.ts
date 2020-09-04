import Express from 'express'
import bodyParser from 'body-parser'
import baseRouter from './routes/index'

const app = Express()
app.use(bodyParser.json())

app.use(function (err: Error, req, res, next) {
  res.status(500).send(err)
})
app.use(baseRouter)

let server = app.listen(process.env.PORT, err => {
  if (err) return console.error(err)
  return console.info('Brutus Is Online...')
})

export { app, server }
