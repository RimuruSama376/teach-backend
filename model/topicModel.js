"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FileSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
});
const TopicSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the topic name'],
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    PDFs: {
        type: [FileSchema],
        required: false,
        unique: false
    },
});
TopicSchema.virtual('topicId').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
TopicSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        return ret;
    }
});
module.exports = mongoose_1.default.model('Topics', TopicSchema);
