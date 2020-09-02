import app from '../src/app'
import request from 'supertest'

test('A', done => {
  request(app)
    .get('/user')
    .expect(404)
    .end(function (err, res) {
      if (err) throw err
      done()
    })
})
