import mongoose, { mongo } from 'mongoose'

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

ChapterSchema.virtual('chapterId').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
ChapterSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    return ret
  }
})

export default mongoose.model('Chapters', ChapterSchema)
