import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

//jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
declare global {
  namespace NodeJS {
    interface Global {
      getCookie(): Promise<string[]>
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

global.getCookie = async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201)
  return res.get('Set-Cookie')
}
