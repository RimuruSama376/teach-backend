import express, { Express, Request, Response, Application } from 'express'
import dotenv from 'dotenv'
import dbConnect from './dbConnect.js'
import BodyParser from 'body-parser'
import cors from 'cors'
import Chapter from './model/chapterModel.js'

//For env File
dotenv.config()
dbConnect()

const app: Application = express()
const port = process.env.PORT || 8000
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server')
})

app.get('/get-chapters', async (req: Request, res: Response) => {
  try {
    const chapters = await Chapter.find({})
    console.log(chapters)
    res.status(200).send(chapters)
  } catch (err) {
    console.log('an error has occured: ', err)
    res.status(500).json({ error: err })
  }
})

app.post('/add-chapter', async (req: Request, res: Response) => {
  try {
    const { chapterName } = req.body
    const chapter = new Chapter({
      name: chapterName
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

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
