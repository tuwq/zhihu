var mongoose = require('mongoose')
var User = mongoose.model('User')
var Question = mongoose.model('Question')
var Answer = mongoose.model('Answer')
var Comment = mongoose.model('Comment')
var QuestionUser = mongoose.model('QuestionUser')
var AnswerUser = mongoose.model('AnswerUser')
var CommentUser = mongoose.model('CommentUser')
const util = require('../../common/util.js')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

let self = this

exports.voteQuestion = function (req,res) {
	// 检查登录
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {	
		// 检查字段
		if(checkUtil.isEmtry([fields.question_id,fields.user_id,fields.vote])) {
			return res.json(util.Result('信息不完整',1))
		}

		// 情况1 
		// 点击和上次相同vote，删除这张表记录			// 0   0
													// 1   0
													// 0   0
													// 0   1
													// 0   0
													// 1   0
		// 情况2
		// 和上次不同，更新数据
		// 情况3
		// 没有上次记录，新建记录
		// 建立第一张表关联
		// 1: 赞 	2:踩

		// 赞同时，给被点赞的问题的用户增加赞同数，
		// 取消赞时， 给被点赞的问题的用户减少赞同数

		QuestionUser.findOne({user_id: fields.user_id,question_id: fields.question_id},(err,dbBind) => {
			if (!dbBind) {
				// 第一次赞踩
				let bind = new QuestionUser({
					question_id: fields.question_id,
					user_id: fields.user_id,
					vote: fields.vote
				})
				bind.save()
				// 处理问题所属用户的赞同数
				self.handleTargetVote(0,fields.question_id,fields.vote,0)
				return res.json(util.Result(0))
			}
			if (dbBind.vote == fields.vote) {
				self.handleTargetVote(0,fields.question_id,0,dbBind.vote)
				//取消了赞踩
				dbBind.vote = 0
				dbBind.save()
				return res.json(util.Result(-1))
			}
			if (dbBind.vote == 0) {
				self.handleTargetVote(0,fields.question_id,fields.vote,0)
				// 第一次添加赞或踩
				dbBind.vote = fields.vote
				dbBind.save()
				return res.json(util.Result(0))
			}
			self.handleTargetVote(0,fields.question_id,fields.vote,dbBind.vote)
			// 改变了
			dbBind.vote  = fields.vote
			dbBind.save()
			return res.json(util.Result(1))
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.voteAnswer = function (req,res) {

	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		// 检查字段
		if(checkUtil.isEmtry([fields.answer_id,fields.user_id,fields.vote])) {
			return res.json(util.Result('信息不完整',1))
		}
		AnswerUser.findOne({user_id: fields.user_id,answer_id: fields.answer_id},(err,dbBind) => {
			if (!dbBind) {
				// 第一次赞踩
				let bind = new AnswerUser({
					answer_id: fields.answer_id,
					user_id: fields.user_id,
					vote: fields.vote
				})
				bind.save()
				// 处理回答所属用户的赞同数
				self.handleTargetVote(1,fields.answer_id,fields.vote,0)
				return res.json(util.Result(0))
			}
			if (dbBind.vote == fields.vote) {
				self.handleTargetVote(1,fields.answer_id,0,dbBind.vote)
				// 取消了赞踩
				dbBind.remove()
				return res.json(util.Result(-1))
			}
			self.handleTargetVote(1,fields.answer_id,fields.vote,dbBind.vote)
			// 改变了
			dbBind.vote  = fields.vote
			dbBind.save()
			return res.json(util.Result(1))
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})	
}

exports.voteComment = function (req,res) {
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		// 检查字段
		if(checkUtil.isEmtry([fields.comment_id,fields.user_id,fields.vote])) {
			return res.json(util.Result('信息不完整',1))
		}
		CommentUser.findOne({user_id: fields.user_id,comment_id: fields.comment_id},(err,dbBind) => {
			if (!dbBind) {
				let bind = new CommentUser({
					comment_id: fields.comment_id,
					user_id: fields.user_id,
					vote: fields.vote
				})
				bind.save()
				// 处理评论所属用户的赞同数
				self.handleTargetVote(2,fields.comment_id,fields.vote,0)
				return res.json(util.Result(0))
			}
			if (dbBind.vote == fields.vote) {
				self.handleTargetVote(2,fields.comment_id,0,dbBind.vote)
				dbBind.remove()
				return res.json(util.Result(-1))
			}
			self.handleTargetVote(2,fields.comment_id,fields.vote,dbBind.vote)
			dbBind.vote  = fields.vote
			dbBind.save()
			return res.json(util.Result(1))
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})	
}


exports.getVoteQuestion = function (question_id,me_id,callback) {
	QuestionUser.count({question_id: question_id,vote: 1},(err,good) => {
		QuestionUser.count({question_id: question_id,vote: 2},(err,bad) => {	
			// 还需要知道当前用户是否赞踩了这个问题
			QuestionUser.findOne({question_id: question_id,user_id: me_id})
			.exec((err,bind)=> {
				let voteStatus
				// 如果用户没有对这项问题的评论
				if ( !bind ) {
					// 那么赞踩状态是0
					voteStatus = 0
				}else {
					voteStatus = bind.vote
				}
				return callback({
					good: good,
					bad: bad,
					voteStatus: voteStatus 
				})
			})
		})
	})
}

exports.getVoteAnswer = function (answer_id,me_id,callback) {
	AnswerUser.count({answer_id: answer_id,vote: 1},(err,good)=> {
		AnswerUser.count({answer_id: answer_id,vote: 2},(err,bad)=> {
			// 还需要知道当前用户是否赞踩了这个问题
			AnswerUser.findOne({answer_id: answer_id,user_id: me_id})
			.exec((err,bind)=> {
				let voteStatus
				// 如果用户没有这项回答的评论
				if (!bind) {
					// 那么赞踩状态是0
					voteStatus = 0
				}else {
					voteStatus = bind.vote
				}
				return callback({
					good: good,
					bad: bad,
					voteStatus: voteStatus
				})
			})
		})
	})
}

exports.getVoteComment = function (comment_id,me_id,callback) {
	CommentUser.count({comment_id: comment_id,vote: 1},(err,good)=> {
		CommentUser.count({comment_id: comment_id,vote: 2},(err,bad)=> {
			// 还需要知道当前用户是否赞踩了这个评论
			CommentUser.findOne({comment_id: comment_id,user_id: me_id})
			.exec((err,bind)=> {
				let voteStatus
				if (!bind) {
					voteStatus = 0
				}else {
					voteStatus = bind.vote
				}
				return callback({
					good: good,
					bad: bad,
					voteStatus: voteStatus
				})
			})
		})
	})
}

// 处理被点赞目标用户的赞踩问题
// type, 0:问题  1:回答 2:评论
exports.handleTargetVote = function(type,target_id,now,pre) {
	if ( type == 0 ) {
		// 寻找提出这个问题所属的用户
		Question.findById(target_id)
		.select('user_id')
		.exec((err,question)=> {
			User.findById(question.user_id)
			.select('approve')
			.exec((err,targetUser)=> {
				self.handleTargetUser(targetUser,now,pre)
			})
		})
	}else if ( type == 1 ) {
		// 寻找提出这个回答所属的用户
		Answer.findById(target_id)
		.select('user_id')
		.exec((err,answer)=> {
			User.findById(answer.user_id)
			.select('approve')
			.exec((err,targetUser)=> {
				self.handleTargetUser(targetUser,now,pre)
			})
		})
	}else if( type== 2 ) {
		// 寻找提出这个评论所属的用户
		Comment.findById(target_id)
		.select('user_id')
		.exec((err,comment)=> {
			User.findById(comment.user_id)
			.select('approve')
			.exec((err,targetUser)=> {
				self.handleTargetUser(targetUser,now,pre)
			})
		})
	}
}
// 处理被点赞用户的赞踩问题
exports.handleTargetUser = function(targetUser,now,pre) {
	if ( now == 1 ) {
		// 被点了一个赞
		targetUser.approve++
	}else if( now ==  0 && pre != 2){
		// 这次取消的上一次不是踩
		targetUser.approve--
	}else if ( now == 2 && pre == 1 ) {
		// 从赞变为踩
		targetUser.approve--
	}
	targetUser.save()
}