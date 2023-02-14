// import dependencies
const mongoose = require('mongoose')
// mongoose schemas set to to strict
// documents will only accept fields listed in schemas
mongoose.set('strictQuery', true)

// idea is a subdocument. NOT A MODEL.
// idea will be part of the ideas array added to specific games

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phase: {
      type: String,
      // enum = validator that specifies which values are accepted
      enum: ['notstarted', 'started', 'fixing', 'complete', 'abandoned'],
      default: 'notstarted',
    },
  },
  { timestamps: true }
)

module.exports = ideaSchema
