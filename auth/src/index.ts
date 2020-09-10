import express from 'express'
import AuthRoutes from './routes/auth.route'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.use(express.json())

app.use('/api/auth', AuthRoutes)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
	console.log('Listening on port: 3000')
})
