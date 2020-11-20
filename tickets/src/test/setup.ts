import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
declare global {
  namespace NodeJS {
    interface Global {
      getCookie(): string[]
    }
  }
}

let mongo: MongoMemoryServer

beforeAll(async () => {
  process.env.JWT_KEY = 'FDSA'
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  try {
    await mongo.stop()
    await mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
})

global.getCookie = () => {
  // It was fine when we were in auth service
  // since we had acces to signup route.
  // in ticket service we don't have acces so we need to fake auth
  // const res = await request(app)
  //   .post('/api/auth/signup')
  //   .send({ email: 'test@test.com', password: 'password' })
  //   .expect(201)
  // return res.get('Set-Cookie')

  // Buil a JWT payload
  const payload = { id: '23x34st4', email: 'test@email.com' }

  // create  JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const sessionJSON = JSON.stringify({ jwt: token })
  const base64 = Buffer.from(sessionJSON).toString('base64')

  return [`express:sess=${base64}`]
}
