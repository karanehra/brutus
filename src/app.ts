import Express from 'express'
import bodyParser from 'body-parser'
import baseRouter from './routes/index'
import cors from 'cors'
import './database/'

const app = Express()
app.use(bodyParser.json())
app.use(cors())
app.use(baseRouter)

app.use((err, req, res, next) => {
  console.log(err)
  if (err._message) return res.status(400).send(err)

  res.status(500).send(err)
})

app.use(function (req, res, next) {
  res.status(404).send({ message: 'Cannot find that URL.' })
})

let server = app.listen(process.env.PORT, err => {
  if (err) return console.error(err)
  return console.info('Brutus Is Online...')
})

export { app, server }
