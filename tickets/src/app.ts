import express from 'express'
import cookieSession from 'cookie-session'

// import AuthRoutes from './routes/auth.routes'
import { errorHandler } from '@arshantechnology/common'
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

//app.use('/api/auth', AuthRoutes)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }
