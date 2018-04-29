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
	}
})

module.exports = AnswerUserSchema