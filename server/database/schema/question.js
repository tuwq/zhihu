const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var QuestionSchema = new Schema({
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	category: {
		type: ObjectId,
		ref: 'Category'
	},
	title: {
		unique: false,
	    required: true,
	    type: String
	},
	anonymousStatus: {
		type: Number,
		default: 0
	},
	desc: {
		unique: false,
	    required: false,
	    type: String
	},
	commentSum: {
		type: Number,
		default: 0
	},
	status: {
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
	browseSum: {
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

QuestionSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})


module.exports = QuestionSchema