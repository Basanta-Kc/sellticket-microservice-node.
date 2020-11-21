import { StatusCodes } from '@arshantechnology/common'
import { body } from 'express-validator'
import request from 'supertest'
import { app } from '../../app'
import { TICKET_END_POINT } from '../../constants'
import { getMongoId } from '../../utils'

const createTicket = (cookie = global.getCookie()) =>
  request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', cookie)
    .send({ title: 'something', price: 32.0 })
    .expect(StatusCodes.CREATED)

describe('Test for updating a ticket', () => {
  it("should return 404 if the ticket for provieded id doesn't exist", async () => {
    const res = await request(app)
      .put(TICKET_END_POINT + getMongoId())
      .set('Cookie', global.getCookie())
      .send({ title: 'valid', price: 1 })
      .expect(StatusCodes.NOT_FOUND)
  })

  it('should return 401 if the user is not authenticated', async () => {
    const res = await request(app)
      .put(TICKET_END_POINT + getMongoId())
      .send({ title: 'valid', price: 1 })
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it("should return 401 if the user doesn't own the ticket", async () => {
    const {
      body: { id },
    } = await createTicket()

    const res = await request(app)
      .put(TICKET_END_POINT + id)
      .set('Cookie', global.getCookie())
      .send({ title: 'valid', price: 1 })
      .expect(StatusCodes.UNAUTHORIZED)
  })

  it('should return 400 if the user provides an invalid title of price', async () => {
    const cookie = global.getCookie()

    const {
      body: { id },
    } = await createTicket(cookie)

    await request(app)
      .put(TICKET_END_POINT + id)
      .set('Cookie', cookie)
      .send({ title: '', price: 1 })
      .expect(StatusCodes.BAD_REQUEST)

    await request(app)
      .put(TICKET_END_POINT + id)
      .set('Cookie', cookie)
      .send({ title: 'sfsd' })
      .expect(StatusCodes.BAD_REQUEST)
  })

  it('should return 200 succesfully update ticket if valid title and price is provieded', async () => {
    const cookie = global.getCookie()

    const {
      body: { id },
    } = await createTicket(cookie)

    const newTicket = { title: 'fdsa', price: 1 }

    await request(app)
      .put(TICKET_END_POINT + id)
      .set('Cookie', cookie)
      .send(newTicket)
      .expect(StatusCodes.OK)

    const {
      body: { title, price },
    } = await request(app)
      .get(TICKET_END_POINT + id)
      .send()
      .expect(StatusCodes.OK)

    expect(newTicket.title).toEqual(title)
    expect(newTicket.price).toEqual(price)
  })
})
