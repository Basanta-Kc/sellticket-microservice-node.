import { Request, Response, NextFunction } from 'express'

export function signIn(req: Request, res: Response, next: NextFunction) {}

export function signUp(req: Request, res: Response, next: NextFunction) {}

export function signOut(req: Request, res: Response, next: NextFunction) {}

export function getCurrentUser(
	req: Request,
	res: Response,
	next: NextFunction
) { res.send('helo')}
