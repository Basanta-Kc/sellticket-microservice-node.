import { StatusCodes } from '@arshantechnology/common'
import request from 'supertest'
import { app } from '../../app'

it('fails when try to login with invalid email', async () => {
  await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('fails when try to login with invalid password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)
  await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@test.com', password: 'password123' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('response with cookie with valid email & password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  const res = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)

  expect(res.get('Set-Cookie')).toBeDefined()
})
