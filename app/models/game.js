const mongoose = require('mongoose')

const ideaSchema = require('./idea')

const gameSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
    },
    isComplete: {
      type: Boolean,
      required: true
    },
		ideas: [ideaSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
		// since we're adding virtuals to our game model
		// we need to tell express to include them when we want them
		toObject: { virtuals: true },
		toJSON: { virtuals: true }
	}
)


module.exports = mongoose.model('Game', gameSchema)
