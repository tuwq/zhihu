var mongoose = require('mongoose')
var User = mongoose.model('User')
var Question = mongoose.model('Question')
var QuestionUser = mongoose.model('QuestionUser')
var AnswerUser = mongoose.model('AnswerUser')
var CommentUser = mongoose.model('CommentUser')
const util = require('../../common/util.js')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

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
		QuestionUser.findOne({user_id: fields.user_id,question_id: fields.question_id},(err,dbBind) => {
			if (!dbBind) {
				// 第一次赞踩
				let bind = new QuestionUser({
					question_id: fields.question_id,
					user_id: fields.user_id,
					vote: fields.vote
				})
				bind.save()
				return res.json(util.Result(0))
			}
			if (dbBind.vote == fields.vote) {
				//取消了赞
				dbBind.vote = 0
				dbBind.save()
				return res.json(util.Result(-1))
			}
			if (dbBind.vote == 0) {
				// 第一次添加赞
				dbBind.vote = fields.vote
				dbBind.save()
				return res.json(util.Result(0))
			}
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
				let bind = new AnswerUser({
					answer_id: fields.answer_id,
					user_id: fields.user_id,
					vote: fields.vote
				})
				bind.save()
				return res.json(util.Result(0))
			}
			if (dbBind.vote == fields.vote) {
				dbBind.remove()
				return res.json(util.Result(-1))
			}
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
				return res.json(util.Result(0))
			}
			if (dbBind.vote == fields.vote) {
				dbBind.remove()
				return res.json(util.Result(-1))
			}
			dbBind.vote  = fields.vote
			dbBind.save()
			return res.json(util.Result(1))
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})	
}


exports.getVoteQuestion = function (question_id,callback) {
	QuestionUser.count({question_id: question_id,vote: 1},(err,good) => {
		QuestionUser.count({question_id: question_id,vote: 2},(err,bad) => {	
			return callback({
				good: good,
				bad: bad
			})
		})
	})
}

exports.getVoteAnswer = function (answer_id,callback) {
	AnswerUser.count({answer_id: answer_id,vote: 1},(err,good)=> {
		AnswerUser.count({answer_id: answer_id,vote: 2},(err,bad)=> {
			return callback({
				good: good,
				bad: bad
			})
		})
	})
}

exports.getVoteComment = function (comment_id,callback) {
	CommentUser.count({comment_id: comment_id,vote: 1},(err,good)=> {
		CommentUser.count({comment_id: comment_id,vote: 2},(err,bad)=> {
			return callback({
				good: good,
				bad: bad
			})
		})
	})
}