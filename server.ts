const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./dbConnect.js')
const BodyParser = require('body-parser')
const cors = require('cors')
const Topic = require('./model/topicModel.js')
const path = require('path')
const chapterRouter = require('./routes/chapter.js')
const topicRouter = require('./routes/topic.js')

import { Request, Response, Application } from 'express'

//For env File
dotenv.config()
dbConnect()

const app: Application = express()
const port = process.env.PORT || 8000
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions))

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))
const filesDir = path.join(__dirname, 'files')
app.use('/files', express.static(filesDir))

app.use((req, res, next) => {
  console.log(`Current API URL: ${req.originalUrl} `, req.body)
  next()
})

app.use('/chapter', chapterRouter)

app.use('/topic', topicRouter)


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
