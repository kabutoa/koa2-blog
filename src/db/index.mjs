import mongoose from 'mongoose'
import { dbUri } from '../config/index.mjs'

export async function connect() {
  await mongoose.connect(dbUri, {
    authSource: 'admin'
  })
}

export async function close() {
  await mongoose.connection.close()
}
