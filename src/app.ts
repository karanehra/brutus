import Express from 'express'
import bodyParser from 'body-parser'
import baseRouter from './routes/index'
import cors from 'cors'
import './database/'

const app = Express()
app.use(bodyParser.json())
app.use(cors())
app.use(baseRouter)

enum JOB_STATUS {
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

app.use((err, req, res, next) => {
  if (err._message) return res.status(400).send(err)

  res.status(500).send(err)
})

let server = app.listen(process.env.PORT, err => {
  if (err) return console.error(err)
  return console.info('Brutus Is Online...')
})

export { app, server }
