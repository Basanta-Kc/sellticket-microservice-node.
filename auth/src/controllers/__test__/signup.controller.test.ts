import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on succcesful signup', async () => {
	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201)
})

it('returns a 400 wtih invalid email', async () => {
	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test.com', password: 'password' })
		.expect(400)
})

it('returns a 400 wtih invalid password', async () => {
	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'pa' })
		.expect(400)
})

it('returns a 400 wtih missing email & password', async () => {
	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com' })
		.expect(400)

	await request(app)
		.post('/api/auth/signup')
		.send({ password: 'password' })
		.expect(400)
})

it('disallows duplicate emails', async () => {
	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201)

	await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(400)
})

it('sets a cookie after successful signup', async () => {
	const res = await request(app)
		.post('/api/auth/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201)
	
	expect(res.get('Set-Cookie')).toBeDefined()
})