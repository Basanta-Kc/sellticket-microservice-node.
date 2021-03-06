import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Password } from '../services/password.service'
import { BadRequestError } from '@arshantechnology/common'
import { User, UserDoc } from '../models/User'

export async function signIn(req: Request, res: Response) {
	const { email, password } = req.body

	const existingUser = await User.findOne({ email })
	if (!existingUser) {
		throw new BadRequestError('Invalid credentials')
	}

	const passwordsMatch = await Password.compare(existingUser.password, password)
	if (!passwordsMatch) {
		throw new BadRequestError('Invalid Credentials')
	}

	setJWT(req, existingUser)

	res.status(200).send(existingUser)
}

export async function signUp(req: Request, res: Response) {
	const { email, password } = req.body

	const existingUser = await User.findOne({ email })
	if (existingUser) {
		throw new BadRequestError('Email Already In Use')
	}

	const user = User.build({ email, password })
	await user.save()

	setJWT(req, user)

	res.status(201).send(user)
}

export function signOut(req: Request, res: Response) {
	req.session = null
	res.send({})
}

export function getAuthUser(req: Request, res: Response) {
	res.send({ authUser: req.authUser || null })
}

// utility function for this controller
// to set jwt

function setJWT(req: Request, user: UserDoc) {
	const userJwt = jwt.sign(
		{ id: user.id, email: user.email },
		process.env.JWT_KEY!
	)

	req.session = {
		jwt: userJwt,
	}
}
