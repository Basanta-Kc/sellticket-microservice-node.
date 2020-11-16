import { body } from 'express-validator'
import { validateRequest } from '@arshantechnology/common'

export const singUpValidation = [
	body('email').isEmail().withMessage('Email must be valid'),
	body('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('Password must be between 4 and 20 characters'),
	validateRequest
]

export const singInValidation = [
	body('email').isEmail().withMessage('Email must be valid'),
	body('password').trim().notEmpty().withMessage('You must supply a password'),
	validateRequest
]
