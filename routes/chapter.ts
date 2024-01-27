const express = require('express')
const Chapter = require('../model/chapterModel.js')
const Topic = require('../model/topicModel.js')
const router = express.Router()

import { Request, Response } from 'express'

router.get('/get-chapters', async (req: Request, res: Response) => {
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

router.post('/add-chapter', async (req: Request, res: Response) => {
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

router.post('/add-topic', async (req: Request, res: Response) => {
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

router.patch('/add-video-content', async (req: Request, res: Response) => {
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

module.exports = router