import { app, server } from '../src/app'
import request from 'supertest'

beforeAll(done => {
  setTimeout(done, 1000)
})
afterAll(() => server.close())

describe('User controller', () => {
  test('Signup password check', done => {
    request(app)
      .post('/user/signup')
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  })

  test('Signup password check', done => {
    request(app)
      .post('/user/signup')
      .send({ password: 'Hello' })
      .expect(500)
      .end((err, res) => {
        console.log(res.body)
        if (err) throw err
        done()
      })
  })
})
