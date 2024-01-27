const express = require('express')
const Chapter = require('../model/chapterModel.js')
const Topic = require('../model/topicModel.js')
const chapterController = require('../controllers/chapter')
const router = express.Router()

import { Request, Response } from 'express'

router.get('/get-chapters', chapterController.getChapters)

router.post('/add-chapter', chapterController.addChapter)

router.post('/add-topic', chapterController.addTopic)

router.patch('/add-video-content', chapterController.addVideoContent)

module.exports = router
