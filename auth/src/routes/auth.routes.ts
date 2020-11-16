import express from 'express'
import 'express-async-errors'
import {
	signIn,
	signUp,
	signOut,
	getAuthUser,
} from '../controllers/auth.controller'
import { authUser } from '@arshantechnology/common'
import {
	singInValidation,
	singUpValidation,
} from '../validations/auth-validators'

const router = express.Router()

router.post('/signout', signOut)
router.get('/user', authUser, getAuthUser)
router.post('/signin', singInValidation, signIn)
router.post('/signup', singUpValidation, signUp)

export default router
