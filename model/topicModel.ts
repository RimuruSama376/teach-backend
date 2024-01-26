import mongoose, { mongo } from 'mongoose'

const FileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    }
  });
  

const TopicSchema = new mongoose.Schema({
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
  
})

TopicSchema.virtual('topicId').get(function () {
  return this._id.toHexString()
})

// Ensure virtual fields are serialised.
TopicSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    return ret
  }
})

export default mongoose.model('Topics', TopicSchema)
