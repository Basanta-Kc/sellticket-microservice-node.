import request from 'supertest'
import { app } from '../../app'

it('response should contain detail of auth user', async () => {
	const cookie = await global.getCookie()
	console.log(cookie)
	const res = await request(app)
		.get('/api/auth/user')
		.set('Cookie', cookie)
		.send({})
		.expect(200)
	console.log(res.body.authUser.email)
	expect(res.body.authUser.email).toEqual('test@test.com')
})

it('response should contain null if not authenticated', async () => {
	const res = await request(app).get('/api/auth/user').send({}).expect(200)
	expect(res.body.authUser).toEqual(null)
})
