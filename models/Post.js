const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Sting,
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
