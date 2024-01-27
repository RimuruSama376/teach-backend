const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./dbConnect.js')
const BodyParser = require('body-parser')
const cors = require('cors')
const Chapter = require('./model/chapterModel.js')
const Topic = require('./model/topicModel.js')
const path = require('path')
const { fileURLToPath } = require('url')

import { Request, Response, Application } from 'express'

const multer = require('multer')

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

const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, './files')
  },
  filename: function (req: Request, file: any, cb: any) {
    console.log('file: ', file)
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

app.use((req, res, next) => {
  console.log(`Current API URL: ${req.originalUrl} `, req.body)
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server')
})

app.get('/get-chapters', async (req: Request, res: Response) => {
  try {
    console.log('searching')
    const chapters = await Chapter.find({})
    console.log(chapters)
    res.status(200).send(chapters)
  } catch (err) {
    console.log('an error has occured: ', err)
    res.status(500).json({ error: err })
  }
})

app.get('/get-topic', async (req: Request, res: Response) => {
  try {
    const { id } = req.query
    const topic = await Topic.findOne({ _id: id })
    console.log(topic)
    res.status(200).send(topic)
  } catch (err) {
    console.log('an error has occured: ', err)
    res.status(500).json({ error: err })
  }
})

app.post('/add-chapter', async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    const chapter = new Chapter({
      name: name
    })
    try {
      const newChapter = await chapter.save()
      if (newChapter) {
        console.log(newChapter)
        res.status(201).send(newChapter)
      }
    } catch (err) {
      console.log('Error creating chapter: ', err)
      res.status(500).json({
        signupStatus: false,
        message: 'Error creating Chapter',
        err
      })
    }
  } catch (err) {
    console.log('an error has occured: ', err)
    res.status(500).json({ error: err })
  }
})

app.post('/add-topic', async (req: Request, res: Response) => {
  try {
    const chapterId = req.query.id
    const { name, description } = req.body
    const topic = new Topic({
      name: name,
      description: description
    })
    try {
      const newTopic = await topic.save()
      if (newTopic) {
        const updatedChapter = await Chapter.findByIdAndUpdate(
          chapterId,
          { $push: { topics: { name: name, topicId: newTopic._id } } }, // Push the new video link to the videos array
          { new: true } // Return the updated document
        )
        console.log(newTopic)
        res.status(201).send({ newTopic, updatedChapter })
      }
    } catch (err) {
      console.log('Error creating chapter: ', err)
      res.status(500).json({
        signupStatus: false,
        message: 'Error creating Chapter',
        err
      })
    }
  } catch (err) {
    console.log('an error has occured: ', err)
    res.status(500).json({ error: err })
  }
})

app.post('/add-pdf', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const topicId = req.query.id
    const name = req.file?.originalname
    const filename = req.file?.filename
    const newPdf = {
      name,
      filename
    }
    try {
      if (newPdf) {
        const updatedTopic = await Topic.findByIdAndUpdate(
          topicId,
          { $push: { PDFs: newPdf } },
          { new: true }
        )
        console.log(newPdf)
        res.status(201).send({ newPdf, updatedTopic })
      }
    } catch (err) {
      console.log('Error creating chapter: ', err)
      res.status(500).json({
        signupStatus: false,
        message: 'Error creating Chapter',
        err
      })
    }
  } catch (err) {
    console.log('an error has occured: ', err)
    res.status(500).json({ error: err })
  }
})

app.patch('/add-video-content', async (req, res) => {
  try {
    const chapterId = req.query.id
    const { videoLink } = req.body
    console.log(videoLink)
    if (!chapterId) {
      return res.status(400).send('Chapter ID is required')
    }
    if (!videoLink) {
      return res.status(400).send('Video link is required')
    }

    // Find the chapter and update it
    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { $push: { videos: videoLink } }, // Push the new video link to the videos array
      { new: true } // Return the updated document
    )

    if (!updatedChapter) {
      return res.status(404).send('Chapter not found')
    }

    res.status(200).json(updatedChapter)
  } catch (err) {
    console.error('Error adding video content: ', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.patch('/update-topic-description', async (req, res) => {
  try {
    const topicId = req.query.id
    const { description } = req.body

    if (!topicId) {
      return res.status(400).send('Chapter ID is required')
    }
    if (!description) {
      return res.status(400).send('Video link is required')
    }

    // Find the topic and update it
    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { $set: { description: description } },
      { new: true } // Return the updated document
    )

    if (!updatedTopic) {
      return res.status(404).send('Chapter not found')
    }

    res.status(200).json(updatedTopic)
  } catch (err) {
    console.error('Error adding video content: ', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
