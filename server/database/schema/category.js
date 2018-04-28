const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types


var CategorySchema = new Schema({
	questions: [{
		type: ObjectId,
		ref: 'Question'
	}],
	content: {
		unique: false,
	    required: true,
	    type: String,
	    default: ''
	}
})
module.exports = CategorySchema