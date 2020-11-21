import { Request, Response } from 'express'
import {
  BadRequestError,
  NotFoundError,
  StatusCodes,
} from '@arshantechnology/common'
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

export async function getTicket(req: Request, res: Response) {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    throw new NotFoundError()
  }

  res.send(ticket)
}
