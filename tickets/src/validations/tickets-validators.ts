import { body } from 'express-validator'
import { validateRequest } from '@arshantechnology/common'

export const createTicketValidation = [
  body('title')
    .isString()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email must be valid'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be specifed and be positive number'),
  validateRequest,
]
