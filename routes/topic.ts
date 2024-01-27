const express = require('express')
const Chapter = require('../model/chapterModel.js')
const Topic = require('../model/topicModel.js')
const router = express.Router()
const multer = require('multer')

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

import { Request, Response } from 'express'

router.get('/get-topic', async (req: Request, res: Response) => {
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

router.post('/add-pdf', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const topicId = req.query.id
    if (!topicId) {
      return res.status(400).send('Topic ID is required')
    }
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

router.patch('/update-topic-description', async (req: Request, res: Response) => {
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

module.exports = router
