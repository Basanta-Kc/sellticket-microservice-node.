import express from 'express'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import AuthRoutes from './routes/auth.routes'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
	cookieSession({
		signed: false,
		secure: true,
	})
)

app.use('/api/auth', AuthRoutes)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
	if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined')

	try {
		await mongoose.connect(
			'mongodb://auth-mongodb-cluster-ip-service:27017/auth',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		)
		console.log('Connected to MongoDb')
	} catch (err) {
		console.error(err)
	}

	app.listen(3000, () => {
		console.log('Listening on port 3000')
	})
}

start()
