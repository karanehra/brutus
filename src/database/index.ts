import mongoose from 'mongoose'

let databaseName = process.env.NODE_ENV === 'test' ? 'brutus-test' : 'brutus'

mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

let database = mongoose.connection

database.on('error', err => {
  console.log('Database connection error... ', err)
})

database.on('open', () => {
  console.log('Database connection success...')
})
