import { Request, Response } from 'express'
import { BadRequestError, StatusCodes } from '@arshantechnology/common'
import { Ticket } from '../models/Ticket'

export async function createTicket(req: Request, res: Response) {
  const { title, price } = req.body

  const ticket = await Ticket.build({
    title,
    price,
    userId: req.authUser!.id,
  })

  await ticket.save()

  res.status(StatusCodes.CREATED).send(ticket)
}
