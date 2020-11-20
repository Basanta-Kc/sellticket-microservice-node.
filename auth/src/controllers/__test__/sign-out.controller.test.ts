import request from 'supertest'
import { app } from '../../app'

it('clear cookie after signout', async () => {
	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'password' })
    .expect(201)
  
  const res = await request(app)
    .post('/api/auth/signout')
    .send({})
    .expect(200)
  
  expect(res.get('Set-Cookie')[0]).toEqual(
		'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
	)
})
