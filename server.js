"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var dbConnect_js_1 = require("./dbConnect.js");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var chapterModel_js_1 = require("./model/chapterModel.js");
var topicModel_js_1 = require("./model/topicModel.js");
var path_1 = require("path");
var url_1 = require("url");
var multer_1 = require("multer");
//For env File
dotenv_1.default.config();
(0, dbConnect_js_1.default)();
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
app.use('/files', express_1.default.static(filesDir));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) {
        console.log('file: ', file);
        var uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});
var upload = (0, multer_1.default)({ storage: storage });
app.get('/', function (req, res) {
    res.send('Welcome to Express & TypeScript Server');
});
app.get('/get-chapters', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapters, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, chapterModel_js_1.default.find({})];
            case 1:
                chapters = _a.sent();
                console.log(chapters);
                res.status(200).send(chapters);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log('an error has occured: ', err_1);
                res.status(500).json({ error: err_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/get-topic', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, topic, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.query.id;
                return [4 /*yield*/, topicModel_js_1.default.findOne({ _id: id })];
            case 1:
                topic = _a.sent();
                console.log(topic);
                res.status(200).send(topic);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log('an error has occured: ', err_2);
                res.status(500).json({ error: err_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/add-chapter', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var name_1, chapter, newChapter, err_3, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                name_1 = req.body.name;
                chapter = new chapterModel_js_1.default({
                    name: name_1
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, chapter.save()];
            case 2:
                newChapter = _a.sent();
                if (newChapter) {
                    console.log(newChapter);
                    res.status(201).send(newChapter);
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log('Error creating chapter: ', err_3);
                res.status(500).json({
                    signupStatus: false,
                    message: 'Error creating Chapter',
                    err: err_3
                });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                console.log('an error has occured: ', err_4);
                res.status(500).json({ error: err_4 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/add-topic', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, _a, name_2, description, topic, newTopic, updatedChapter, err_5, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                chapterId = req.query.id;
                _a = req.body, name_2 = _a.name, description = _a.description;
                topic = new topicModel_js_1.default({
                    name: name_2,
                    description: description
                });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, topic.save()];
            case 2:
                newTopic = _b.sent();
                if (!newTopic) return [3 /*break*/, 4];
                return [4 /*yield*/, chapterModel_js_1.default.findByIdAndUpdate(chapterId, { $push: { topics: { name: name_2, topicId: newTopic._id } } }, // Push the new video link to the videos array
                    { new: true } // Return the updated document
                    )];
            case 3:
                updatedChapter = _b.sent();
                console.log(newTopic);
                res.status(201).send({ newTopic: newTopic, updatedChapter: updatedChapter });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_5 = _b.sent();
                console.log('Error creating chapter: ', err_5);
                res.status(500).json({
                    signupStatus: false,
                    message: 'Error creating Chapter',
                    err: err_5
                });
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                err_6 = _b.sent();
                console.log('an error has occured: ', err_6);
                res.status(500).json({ error: err_6 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post('/add-pdf', upload.single('file'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topicId, name_3, filename, newPdf, updatedTopic, err_7, err_8;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                topicId = req.query.id;
                name_3 = (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname;
                filename = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
                newPdf = {
                    name: name_3,
                    filename: filename
                };
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                if (!newPdf) return [3 /*break*/, 3];
                return [4 /*yield*/, topicModel_js_1.default.findByIdAndUpdate(topicId, { $push: { PDFs: newPdf } }, { new: true })];
            case 2:
                updatedTopic = _c.sent();
                console.log(newPdf);
                res.status(201).send({ newPdf: newPdf, updatedTopic: updatedTopic });
                _c.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_7 = _c.sent();
                console.log('Error creating chapter: ', err_7);
                res.status(500).json({
                    signupStatus: false,
                    message: 'Error creating Chapter',
                    err: err_7
                });
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_8 = _c.sent();
                console.log('an error has occured: ', err_8);
                res.status(500).json({ error: err_8 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.patch('/add-video-content', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chapterId, videoLink, updatedChapter, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                chapterId = req.query.id;
                videoLink = req.body.videoLink;
                if (!chapterId) {
                    return [2 /*return*/, res.status(400).send('Chapter ID is required')];
                }
                if (!videoLink) {
                    return [2 /*return*/, res.status(400).send('Video link is required')];
                }
                return [4 /*yield*/, chapterModel_js_1.default.findByIdAndUpdate(chapterId, { $push: { videos: videoLink } }, // Push the new video link to the videos array
                    { new: true } // Return the updated document
                    )];
            case 1:
                updatedChapter = _a.sent();
                if (!updatedChapter) {
                    return [2 /*return*/, res.status(404).send('Chapter not found')];
                }
                res.status(200).json(updatedChapter);
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                console.error('Error adding video content: ', err_9);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.patch('/update-topic-description', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var topicId, description, updatedTopic, err_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                topicId = req.query.id;
                description = req.body.description;
                if (!topicId) {
                    return [2 /*return*/, res.status(400).send('Chapter ID is required')];
                }
                if (!description) {
                    return [2 /*return*/, res.status(400).send('Video link is required')];
                }
                return [4 /*yield*/, topicModel_js_1.default.findByIdAndUpdate(topicId, { $set: { description: description } }, { new: true } // Return the updated document
                    )];
            case 1:
                updatedTopic = _a.sent();
                if (!updatedTopic) {
                    return [2 /*return*/, res.status(404).send('Chapter not found')];
                }
                res.status(200).json(updatedTopic);
                return [3 /*break*/, 3];
            case 2:
                err_10 = _a.sent();
                console.error('Error adding video content: ', err_10);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is Fire at http://localhost:".concat(port));
});
