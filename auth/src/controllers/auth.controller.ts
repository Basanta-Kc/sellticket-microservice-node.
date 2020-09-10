import { Request, Response, NextFunction } from 'express'
import { DatabaseConnectionError } from '../errors/database-connection-error'

export async function signIn(req: Request, res: Response, next: NextFunction) {
	throw new DatabaseConnectionError()
}

export function signUp(req: Request, res: Response, next: NextFunction) {}

export function signOut(req: Request, res: Response, next: NextFunction) {}

export function getCurrentUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.send('helo')
}
