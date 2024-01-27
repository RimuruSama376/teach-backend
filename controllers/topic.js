"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chapter = require('../model/chapterModel.js');
const Topic = require('../model/topicModel.js');
const getTopic = async (req, res) => {
    try {
        const { id } = req.query;
        const topic = await Topic.findOne({ _id: id });
        console.log(topic);
        res.status(200).send(topic);
    }
    catch (err) {
        console.log('an error has occured: ', err);
        res.status(500).json({ error: err });
    }
};
const addPdf = async (req, res) => {
    try {
        const topicId = req.query.id;
        if (!topicId) {
            return res.status(400).send('Topic ID is required');
        }
        const name = req.file?.originalname;
        const filename = req.file?.filename;
        const newPdf = {
            name,
            filename
        };
        try {
            if (newPdf) {
                const updatedTopic = await Topic.findByIdAndUpdate(topicId, { $push: { PDFs: newPdf } }, { new: true });
                console.log(newPdf);
                res.status(201).send({ newPdf, updatedTopic });
            }
        }
        catch (err) {
            console.log('Error creating chapter: ', err);
            res.status(500).json({
                signupStatus: false,
                message: 'Error creating Chapter',
                err
            });
        }
    }
    catch (err) {
        console.log('an error has occured: ', err);
        res.status(500).json({ error: err });
    }
};
const updateTopicDescription = async (req, res) => {
    try {
        const topicId = req.query.id;
        const { description } = req.body;
        if (!topicId) {
            return res.status(400).send('Chapter ID is required');
        }
        if (!description) {
            return res.status(400).send('Video link is required');
        }
        const updatedTopic = await Topic.findByIdAndUpdate(topicId, { $set: { description: description } }, { new: true });
        if (!updatedTopic) {
            return res.status(404).send('Chapter not found');
        }
        res.status(200).json(updatedTopic);
    }
    catch (err) {
        console.error('Error adding video content: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { getTopic, addPdf, updateTopicDescription };
