import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL as string)
    .then(() => {
      console.log('Successfully connected to MongoDB')
    })
    .catch((err) => {
      console.log('Unable to connect to MongoDb: ', err)
    })
}

export default dbConnect
