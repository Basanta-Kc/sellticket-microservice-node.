import { StatusCodes } from '@arshantechnology/common'
import request from 'supertest'
import { app } from '../../app'
import { TICKET_END_POINT } from '../../constants'

it('should have post request /api/tickets to create ticket', async () => {
  const response = await request(app).post(TICKET_END_POINT).send({})
  expect(response.status).not.toEqual(404)
})

it('should return 401 when user is not signed in', async () => {
  await request(app).post(TICKET_END_POINT).send({}).expect(401)
})

it('should not return 401 when user is not signed in', async () => {
  const response = await request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', global.getCookie())
    .send({})
  expect(response.status).not.toEqual(401)
})

it('should return an error if invalid title is provided', async () => {
  await request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', global.getCookie())
    .send({ title: '', price: 12.0 })
    .expect(StatusCodes.BAD_REQUEST)

  await request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', global.getCookie())
    .send({ price: 12.0 })
    .expect(StatusCodes.BAD_REQUEST)
})

it('should return an error if invalid price is provided', async () => {
  await request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', global.getCookie())
    .send({ title: 'Basanta Concert', price: -34 })
    .expect(StatusCodes.BAD_REQUEST)

  await request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', global.getCookie())
    .send({ title: 'Test Title' })
    .expect(StatusCodes.BAD_REQUEST)
})

it('should create a ticket with valid input. (new record on db)', async () => {
  await request(app)
    .post(TICKET_END_POINT)
    .send({ title: 'The Script', price: 30.0 })
    .expect(201)
})
