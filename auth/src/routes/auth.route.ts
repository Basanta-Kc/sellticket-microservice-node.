import express from 'express'
import {
	signIn,
	signUp,
	signOut,
	getCurrentUser,
} from '../controllers/auth.controller'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/signout', signOut)
router.get('/user', getCurrentUser)

export default router 