const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var Question_User = new Schema({
	question_id: {
		type: ObjectId,
		ref: 'Question'
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	vote: {
		type: Number,
		default: 0
	}
})
module.exports = Question_User