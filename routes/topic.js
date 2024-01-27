"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const multer = require('multer');
const topicController = require('../controllers/topic');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        console.log('file: ', file);
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage: storage });
router.get('/get-topic', topicController.getTopic);
router.post('/add-pdf', upload.single('file'), topicController.addPdf);
router.patch('/update-topic-description', topicController.updateTopicDescription);
module.exports = router;
