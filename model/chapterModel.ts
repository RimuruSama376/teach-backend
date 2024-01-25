import mongoose, { mongo } from 'mongoose'

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the chapter name'],
    unique: false
  },
})

export default mongoose.model("Chapters", ChapterSchema)