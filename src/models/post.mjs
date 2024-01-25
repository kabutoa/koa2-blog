import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    pv: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const postModel = mongoose.model('Post', postSchema)

export default postModel
