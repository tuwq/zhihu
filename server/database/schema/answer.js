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
	bad: {
		type: Number,
		default: 0
	},
	meta: {
	    createdAt: {
	      type: Date,
	      default: new Date().Format('yyyy-MM-dd')
	    },
	    updatedAt: {
	      type: Date,
	      default: new Date().Format('yyyy-MM-dd')
	    }
  	}
})
AnswerSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = new Date().Format('yyyy-MM-dd')
  } else {
    this.meta.updatedAt = new Date().Format('yyyy-MM-dd')
  }
  next()
})
module.exports = AnswerSchema