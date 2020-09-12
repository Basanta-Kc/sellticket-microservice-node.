import express from 'express'
import 'express-async-errors'
import {
	signIn,
	signUp,
	signOut,
	getCurrentUser,
} from '../controllers/auth.controller'
import { singUpValidation } from '../validations'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', singUpValidation, signUp)
router.post('/signout', signOut)
router.get('/user', getCurrentUser)

export default router
