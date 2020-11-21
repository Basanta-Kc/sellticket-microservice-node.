import { requireAuth } from '@arshantechnology/common'
import express from 'express'
import 'express-async-errors'
import { TICKET_END_POINT } from '../constants'
import {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
} from '../controllers/tickets.controller'
import { createTicketValidation } from '../validations/tickets-validators'

const router = express.Router()

router.get(TICKET_END_POINT, getTickets)
router.get(TICKET_END_POINT + ':id', getTicket)
router.put(TICKET_END_POINT + ':id', requireAuth, createTicketValidation,updateTicket)
router.post(TICKET_END_POINT, requireAuth, createTicketValidation, createTicket)

export default router
