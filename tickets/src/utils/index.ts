import mongoose from 'mongoose'

export const getMongoId = () => new mongoose.Types.ObjectId().toHexString()
