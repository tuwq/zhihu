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
	comments: [{
		type: ObjectId,
		ref: 'Comment'
	}],
	bad: {
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
module.exports = AnswerSchema