import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { User } from '../models/User'

export async function signIn(req: Request, res: Response, next: NextFunction) {
	throw new DatabaseConnectionError()
}

export async function signUp(req: Request, res: Response) {
	 const errors = validationResult(req)

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array())
		}

		const { email, password } = req.body

		const existingUser = await User.findOne({ email })

		if (existingUser) {
			throw new BadRequestError('Email in use')
		}

		const user = User.build({ email, password })
		await user.save()

		res.status(201).send(user)
}

export function signOut(req: Request, res: Response, next: NextFunction) {}

export function getCurrentUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.send('helo')
}
