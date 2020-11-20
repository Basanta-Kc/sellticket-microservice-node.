import { StatusCodes } from '@arshantechnology/common'
import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on succcesful signup', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)
})

it('returns a StatusCodes.BAD_REQUEST wtih invalid email', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test.com', password: 'password' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('returns a StatusCodes.BAD_REQUEST wtih invalid password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'pa' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('returns a StatusCodes.BAD_REQUEST wtih missing email & password', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com' })
    .expect(StatusCodes.BAD_REQUEST)

  await request(app)
    .post('/api/auth/signup')
    .send({ password: 'password' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('sets a cookie after successful signup', async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)

  expect(res.get('Set-Cookie')).toBeDefined()
})
