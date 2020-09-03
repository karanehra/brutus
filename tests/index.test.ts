import { app, server } from '../src/app'
import request from 'supertest'

afterAll(() => server.close())

test('User Controller ', done => {
  request(app)
    .post('/user/signup')
    .expect(200)
    .end((err, res) => {
      if (err) throw err
      done()
    })
})
