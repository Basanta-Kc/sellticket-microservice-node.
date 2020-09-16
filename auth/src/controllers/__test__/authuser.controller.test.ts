import request from 'supertest'
import { app } from '../../app'

it('response should contain detail of auth user', async () => {
	const signupRes = await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201)

	const cookie = signupRes.get('Set-Cookie')

	const res = await request(app)
		.get('/api/auth/user')
		.set('Cookie', cookie)
		.send({})
		.expect(200)
})
