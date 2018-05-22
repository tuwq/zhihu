const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types


var AnswerSchema = new Schema({
	content: {
		unique: false,
	    required: true,
	    type: String
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	question_id: {
		type: ObjectId,
		ref: 'Question'
	},
	anonymousStatus: {
		type: Number,
		default: 0
	},
	good: {
		type: Number,
		default: 0
	},
	bad: {
		type: Number,
		default: 0
	},
	commentSum: {
		type: Number,
		default: 0
	},
	meta: {
	    createdAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updatedAt: {
	      type: Date,
	      default: Date.now()
	    }
  	}
})
AnswerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
module.exports = AnswerSchema