const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var QuestionSchema = new Schema({
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	categorys: [{
		type: ObjectId,
		ref: 'Category'
	}],
	title: {
		unique: false,
	    required: true,
	    type: String
	},
	desc: {
		unique: false,
	    required: true,
	    type: String
	},
	imgs: [String],
	status: {
		type: Number,
		default: 0
	},
	answers: [{
		type: ObjectId,
		ref: 'Answer'
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
module.exports = QuestionSchema