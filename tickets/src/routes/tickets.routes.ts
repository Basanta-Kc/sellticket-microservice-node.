import { requireAuth } from '@arshantechnology/common'
import express from 'express'
import 'express-async-errors'
import { TICKET_END_POINT } from '../constants'
import { createTicket } from '../controllers/tickets.controller'
import { createTicketValidation } from '../validations/tickets-validators'

const router = express.Router()

router.post(TICKET_END_POINT, requireAuth, createTicketValidation, createTicket)

export default router
