import express from 'express'
import 'express-async-errors'
import {
	signIn,
	signUp,
	signOut,
	getCurrentUser,
} from '../controllers/auth.controller'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'
import { validateRequest } from '../middlewares/validate-requests'
import {
	singInValidation,
	singUpValidation,
} from '../validations/auth-validators'

const router = express.Router()

router.post('/signout', signOut)
router.get('/user', currentUser, requireAuth, getCurrentUser)
router.post('/signin', singInValidation, signIn)
router.post('/signup', singUpValidation, signUp)

export default router
