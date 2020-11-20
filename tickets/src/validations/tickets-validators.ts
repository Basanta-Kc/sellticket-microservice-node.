import { body } from 'express-validator'
import { validateRequest } from '@arshantechnology/common'

export const createTicketValidation = [
  body('title')
    .isString()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title must be specified'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be specifed.'),
  validateRequest,
]
