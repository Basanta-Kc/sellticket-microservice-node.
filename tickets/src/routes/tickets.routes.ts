import { requireAuth } from '@arshantechnology/common'
import express from 'express'
import 'express-async-errors'
import { TICKET_END_POINT } from '../constants'
import { createTicket, getTicket } from '../controllers/tickets.controller'
import { createTicketValidation } from '../validations/tickets-validators'

const router = express.Router()

router.get(`${TICKET_END_POINT}/:id`, getTicket)
router.post(TICKET_END_POINT, requireAuth, createTicketValidation, createTicket)

export default router
