const mongoose = require('mongoose')
const util = require('../../common/util.js')
const User = mongoose.model('User')
const Question = mongoose.model('Question')
const Answer = mongoose.model('Answer')
const Comment = mongoose.model('Comment')
const Dynamic = mongoose.model('Dynamic')
const Vote = require('./vote.js')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')
const self = this

exports.test = function (req,res) {
	Dynamic.find({},(err,dynamics)=> {
		return res.json(util.Result(dynamics))
	})
}

// 读取发送Feed动态列表
exports.readSend = function (req,res) {
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((me_id)=> {
		var fields = req.body
		let target_id = fields.detail_id
		var limit = fields.limit
		var page = fields.page
		var skip = limit*(page-1)

		User.findById(target_id)
		.populate({
			path: 'sendFeed',
			options: {sort: {'meta.updatedAt': -1},limit: limit,skip: skip}
		})
		.exec((err,user)=>{
			// 获得每个动态的信息
			self.getDynamic(user.sendFeed,me_id,(processSendDynamics)=> {
				return res.json(util.Result({dynamics: processSendDynamics}))
			})
		})	
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.getDynamic = function (sendDynamics,me_id,callback) {
	let items = [];
	(function iterator(i){
		if ( i === sendDynamics.length ) {
			return callback( items )
		}
		// 动态类型
		// 1:问题相关 2:回答相关	3:评论相关
		// 动作类型
		// 1:提出	2:关注	3:点赞
		if ( sendDynamics[i].type === 1 && sendDynamics[i] != null ) {
			self.handleQuestionDynamic(sendDynamics[i],(item)=>{
				items.push( item )
				iterator( i + 1 )
			})
		}else if( sendDynamics[i].type === 2 && sendDynamics[i] != null ){
			self.handleAnswerDynamic(sendDynamics[i],me_id,(item)=>{
				items.push( item )
				iterator( i + 1 )
			})
		}
	})(0)
}


exports.handleQuestionDynamic = function (dynamic,callback) {
	// 处理问题动态
	Question.findById(dynamic.question_id)
	.select('title')
	.exec((err,question)=>{
		let _dynamic = util.copyObj(dynamic)
		_dynamic.title = question.title
		callback(_dynamic)
	})	
}

exports.handleAnswerDynamic = function (dynamic,me_id,callback) {
	// 处理回答动态
	Answer.findById(dynamic.answer_id,(err,answer)=>{
		// 这个回答的问题标题
		Question.findById(answer.question_id)
		.select('title')
		.exec((err,question)=>{
			// 这个回答人的信息
			User.findById(answer.user_id)
			.select('username avatar')
			.exec((err,user)=>{
				// 这个回答的评论数量
				Comment.count({answer_id: answer._id},(err,commentSum)=>{
					// 我是否赞踩了这个回答
					Vote.getVoteAnswer(answer._id,me_id,({good,bad,voteStatus})=>{
						let _dynamic = util.copyObj(dynamic)
						_dynamic.title = question.title
						_dynamic.user  = user
						_dynamic.content = answer.content
						_dynamic.good = good
						_dynamic.bad = bad
						_dynamic.voteStatus = voteStatus
						_dynamic.commentSum = commentSum
						callback(_dynamic)
					})	
				})
			})
		})
	})
}