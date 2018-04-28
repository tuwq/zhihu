const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var UserSchema = new Schema({
	username: {
		unique: false,
	    required: true,
	    type: String
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
		type: String
	},
	intro: String,
	info: String,
	avatar_url: [String],
	vcode: String,
	hobby: [String],	
	sex: {				
		type: Number,
		default: 0 
	},			
	registStatus: {
		type: Number,
		default: 0
	},
	attentions: [{
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
	approve: {
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
module.exports = UserSchema