import { Request, Response } from 'express'
import { BadRequestError } from '@arshantechnology/common'

export async function createTicket(req: Request, res: Response) {
  res.sendStatus(200)
}