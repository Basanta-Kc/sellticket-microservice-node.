import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
	id: string
	email: string
}

declare global {
	namespace Express {
		interface Request {
			authUser?: UserPayload
		}
	}
}

export const authUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		return next()
	}

	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload
		req.authUser = payload
	} catch (err) {}

	next()
}
