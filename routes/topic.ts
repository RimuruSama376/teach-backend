const express = require('express')
const router = express.Router()
const multer = require('multer')
const topicController = require('../controllers/topic')

import { Request, Response } from 'express'

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
router.get('/get-topic', topicController.getTopic)

router.post('/add-pdf', upload.single('file'), topicController.addPdf)

router.patch('/update-topic-description', topicController.updateTopicDescription)

module.exports = router
