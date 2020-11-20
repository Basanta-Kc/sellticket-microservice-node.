import express from 'express'
import cookieSession from 'cookie-session'

import TicketsRoutes from './routes/tickets.routes'
import { authUser, errorHandler } from '@arshantechnology/common'
import { NotFoundError } from '@arshantechnology/common'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
)

app.use(authUser)
app.use(TicketsRoutes)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }
