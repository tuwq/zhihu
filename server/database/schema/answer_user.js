const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var AnswerUserSchema = new Schema({
	answer_id: {
		type: ObjectId,
		ref: 'Answer'
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	vote: {
		unique: false,
	    required: true,
		type: Number,
		default: 0
	},
	bad: {
		unique: false,
	    required: true,
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

AnswerUserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

module.exports = AnswerUserSchema