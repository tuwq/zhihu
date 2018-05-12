const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types
const moment = require('moment')

// console.log(moment(Date.now()).format('YYYY-MM-DD'))

var CommentSchema = new Schema({
	content: {
		unique: false,
	    required: true,
	    type: String,
	 	default: ''
	},
	question_id: {
		type: ObjectId,
		ref: 'Question'
	},
	answer_id: {
		type: ObjectId,
		ref: 'Answer'
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	to: {
		type: ObjectId,
		ref: 'Comment'
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

CommentSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
module.exports = CommentSchema