import Express from 'express'

const app = Express()

app.get('/', (_, res) => {
  res.send('hey')
})

app.listen(process.env.PORT, err => {
  if (err) return console.error(err)
  return console.info('Brutus Is Online...')
})
