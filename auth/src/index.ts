import express from 'express'
import AuthRoutes from './routes/auth.route'

const app = express()
app.use(express.json())

// Mount Auth Routes
app.use('/api/auth', AuthRoutes)

app.listen(3000, () => {
  console.log('helloooo')

	console.log('Listening on port: 3000')
})
