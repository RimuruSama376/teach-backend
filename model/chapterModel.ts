const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'topics',
    required: true
  }
});

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the chapter name'],
    unique: false
  },
  videos: {
    type: [String],
    required: false,
    unique: false
  },
  topics: [TopicSchema]
})

ChapterSchema.virtual('chapterId').get(function (this: any) {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
ChapterSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc:any, ret:any) {
    delete ret._id
    return ret
  }
})

module.exports =  mongoose.model('Chapters', ChapterSchema)
