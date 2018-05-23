var mongoose = require('mongoose')
var Answer = mongoose.model('Answer')
var Question = mongoose.model('Question')
var Comment = mongoose.model('Comment')
var Vote = require('./vote.js')
const answerKue = require('../../kue/answer.js')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

exports.insert = function (req,res) {
	// 检查登录
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		if(checkUtil.isEmtry([fields.user_id,fields.question_id,fields.content])) {
			return res.json(util.Result('信息不完整',1))
		}
		// 不能回答自己提出的问题
		Question.findById(fields.question_id)
		.select('user_id')
		.exec((err,question)=> {
			if (question.user_id==fields.user_id) {
				return res.json(util.Result('不能回答自己提出的问题',2))
			}
			// 是否以回答
			Answer.findOne({user_id: fields.user_id,question_id: fields.question_id},(err,answer)=> {
				if (answer) {
					return res.json(util.Result('你以回答过该问题',2))
				}else{
					var answer = new Answer({
						content: fields.content,
						user_id: fields.user_id,
						question_id: fields.question_id,
						anonymousStatus: fields.anonymousStatus
					})
					answer.save()
					// 添加一条动态
					answerKue.answerAdd({
						question_id: fields.question_id,
						answer_id: answer._id,
						user_id: _id
					})
					return res.json(util.Result(0))
				}
			})
		})	
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.read = function (req,res) {

	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		var fields = req.body
		var limit = fields.limit
		var page = fields.page
		var skip = limit*(page-1)
		Answer.find({question_id: fields.question_id})
		.populate('user_id')
		.limit(limit)
		.skip(skip)
		.sort({'meta.updatedAt': -1})
		.exec((err,answers)=> {
			// 获得每个回答下的评论数量
			getCommentSum(answers,(answers)=> {
				// 获取该问题下的回答数量
				Answer.count({question_id: fields.question_id},(err,answerSum)=> {
					getVote(answers,_id,(answers,infos)=> {
						let RemainingCount = answers.length
						return res.json(util.Result({answers: answers,infos: infos,answerSum: answerSum,RemainingCount}))
					})
				})
			})
		})		
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

function getVote(answers,me_id,callback) {
	let infos = [];
	(function iterator(i){
		if (i == answers.length) {
			callback(answers,infos)
			return 
		}
		Vote.getVoteAnswer(answers[i]._id,me_id,({good,bad,voteStatus})=> {
			answers[i].good = good
			answers[i].bad = bad
			infos.push({
				voteStatus: voteStatus
			})
			iterator(i+1)
		})
	})(0)
}


function getCommentSum(answers,callback) {
	(function iterator(i){
		if (i == answers.length) {
			callback(answers)
			return 
		}
		Comment.count({answer_id: answers[i]._id},(err,commentSum)=> {
			answers[i].commentSum = commentSum
			iterator(i+1)
		})
	})(0)
}

exports.test = function (req,res) {
	Answer.find({},(err,answers)=> {
		res.json(util.Result({answers: answers}))
	})
}
