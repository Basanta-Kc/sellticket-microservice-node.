import { Request, Response } from 'express'
import {
  BadRequestError,
  NotAuthorizedError,
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

export async function getTickets(req: Request, res: Response) {
  const ticket = await Ticket.find({})
  res.send(ticket)
}

export async function updateTicket(req: Request, res: Response) {
  const { title, price } = req.body
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) throw new NotFoundError()

  if (ticket.userId !== req.authUser!.id) throw new NotAuthorizedError()

  ticket.set({title, price})

  await ticket.save()

  res.send(ticket)
}
