import { StatusCodes } from '@arshantechnology/common'
import request from 'supertest'
import { app } from '../../app'
import { TICKET_END_POINT } from '../../constants'
import { Ticket } from '../../models/Ticket'
import { getMongoId } from '../../utils'

describe('Test for getting a ticket', () => {
  it('should return 404 if we dont find ticket for given id', async () => {
    await request(app)
      .get(TICKET_END_POINT + getMongoId())
      .send({})
      .expect(StatusCodes.NOT_FOUND)
  })

  it('should return ticket if ticket with given id is found', async () => {
    const ticket = { title: 'the script', price: 203 }

    const { body: resTicket } = await request(app)
      .post(TICKET_END_POINT)
      .set('Cookie', global.getCookie())
      .send(ticket)
      .expect(StatusCodes.CREATED)

    const ticketRes = await request(app)
      .get(TICKET_END_POINT + resTicket.id)
      .send()
      .expect(StatusCodes.OK)

    expect(resTicket.title).toEqual(ticketRes.body.title)
    expect(resTicket.price).toEqual(ticketRes.body.price)
  })
})
