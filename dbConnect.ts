const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL as string)
    .then(() => {
      console.log('Successfully connected to MongoDB')
    })
    .catch((err: any) => {
      console.log('Unable to connect to MongoDb: ', err)
    })
}

module.exports = dbConnect
