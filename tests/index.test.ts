import { app, server } from '../src/app'
import request from 'supertest'

beforeAll(done => {
  setTimeout(done, 1000)
})
afterAll(() => server.close())

describe('User controller', () => {
  test('Signup password required check', done => {
    request(app)
      .post('/user/signup')
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  })

  test('Signup negative validation check', done => {
    request(app)
      .post('/user/signup')
      .send({ password: 'Hello' })
      .expect(400)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  })

  test('Signup positive validation check', done => {
    request(app)
      .post('/user/signup')
      .send({ password: 'Hello', email: 'karan@karan.com', userType: 'MASTER' })
      .expect(201)
      .end((err, res) => {
        if (err) throw err
        done()
      })
  })
})
