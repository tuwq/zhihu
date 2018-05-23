const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types

var DynamicSchema = new Schema({
	// 动态类型
	// 1:问题相关 2:回答相关	3:评论相关
	type: {					
		type: Number,
		default: 0
	},
	// 动作类型
	// 1:提出	2:关注	3:点赞
	action: {
		type: Number,
		default: 0	
	},
	user_id: {
		type: ObjectId,
		ref: 'User'
	},
	question_id: {
		type: ObjectId,
		ref: 'Question'
	},
	answer_id: {
		type: ObjectId,
		ref: 'Answer'
	},
	comment_id: {
		type: ObjectId,
		ref: 'Comment'
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


DynamicSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

module.exports = DynamicSchema