const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var UserSchema = new mongoose.Schema({
	username: {
		unique: false,
	    required: true,
	    type: String,
	},
	emial: {
		unique: true,
		required: false,
		type: String,
		default: ''
	},
	phone: {
		unique: true,
		required: false,
		type: String,
		default: ''
	},
	password: {
		unique: false,
		required: true,
		type: String,
		default: ''
	},
	intro: String,
	info: String,
	avatar_url: String,
	vcode: String,
	hobby: [String],
	sex: Number,
	registStatus: Number,
	attention_users: [{
	    type: ObjectId,
	    ref: 'User'
	}],
	fans: [{
	    type: ObjectId,
	    ref: 'User'
	}],
	answers: [{
	    type: ObjectId,
	    ref: 'Answer'
	}],
	comments: [{
		type: ObjectId,
		ref: 'Comment'
	}],
	approve: Number,
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
mongoose.model('User', UserSchema)
module.exports = UserSchema