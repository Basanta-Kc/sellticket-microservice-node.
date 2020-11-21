import { StatusCodes } from '@arshantechnology/common'
import { body } from 'express-validator'
import request from 'supertest'
import { app } from '../../app'
import { TICKET_END_POINT } from '../../constants'

const createTicket = () =>
  request(app)
    .post(TICKET_END_POINT)
    .set('Cookie', global.getCookie())
    .send({ title: 'something', price: 32.0 })
    .expect(StatusCodes.CREATED)

describe('Test for getting tickets', () => {
  it('should return array of tickets', async () => {
    await createTicket()
    await createTicket()

    const res = await request(app)
      .get(TICKET_END_POINT)
      .send({})
      .expect(StatusCodes.OK)

    expect(res.body.length).toEqual(2)
  })
})
