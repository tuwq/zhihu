const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

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
	from: {
		type: ObjectId,
		ref: 'User'
	},
	to: {
		type: ObjectId,
		ref: 'Comment'
	},
	comments: [{
		type: ObjectId,
		ref: 'Comment'
	}],
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
module.exports = CommentSchema