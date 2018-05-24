var mongoose = require('mongoose')
var Question = mongoose.model('Question')
var Category = mongoose.model('Category')
var Comment = mongoose.model('Comment')
var Answer = mongoose.model('Answer')
var Attention = require('./attention.js')
var Follow = require('./follow.js')
var Vote = require('./vote.js')
const questionKue = require('../../kue/question.js')
const util = require('../../common/util.js')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

const self = this

exports.insert = function (req,res) {
	// 检查登录
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		var fields = req.body 
		// 检查字段
		if(checkUtil.isEmtry([fields.title,fields.category,fields.anonymousStatus])){
			return res.json(util.Result('信息不完整',1))
		}
		// 创建问题
		const question = new Question({
			user_id: _id,
			title: fields.title,
			anonymousStatus: fields.anonymousStatus,
			desc: fields.desc
		})
		var q_id = question._id;
		// 寻找分类
		Category.findOne({content:fields.category},(err,category)=> {
			if (!category) {
				// 不存在分类
				var questions = [];
				questions.push(q_id)
				var category = new Category({
					content: fields.category,
					questions: questions
				})
			}else{
				// 存在
				var questions = category.questions;
				questions.push(q_id)
			}
			category.save();
			var c_id = category._id;
			question.category = c_id;
			question.save()
			// 发送 一条动态
			questionKue.questionAdd({question_id: question._id,user_id: _id})
			return res.json(util.Result(question))
		})
	}).catch((err)=> {
		return res.json(util.Result(1))
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
		Question.find({})
		.populate('category')
		.populate('user_id')
		.limit(limit)
		.skip(skip)
		.sort({'meta.updatedAt': -1})
		.exec((err,questions)=> {
			getCommentSum(questions,(questions)=> {
				getVote(questions,_id,(questions,infos)=>{
					let RemainingCount = questions.length;
					return res.json(util.Result({questions: questions,infos: infos,RemainingCount}))
				})
			})
		})	
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

function getCommentSum(questions,callback) {
	(function iterator(i){
		if (i == questions.length) {
			callback(questions)
			return 
		}
		Comment.count({question_id: questions[i]._id,answer_id: undefined},(err,commentSum)=> {
			questions[i].commentSum = commentSum
			iterator(i+1)
		})
	})(0)
}


function getVote(questions,me_id,callback) {
	let infos = [];
	(function iterator(i){
		if (i == questions.length) {
			callback(questions,infos)
			return 
		}
		Vote.getVoteQuestion(questions[i]._id,me_id,({good,bad,voteStatus})=> {
			questions[i].good = good
			questions[i].bad = bad
			infos.push({
				voteStatus: voteStatus
			})
			iterator(i+1)
		})
	})(0)
}


exports.test = function (req,res) {
	Question.find({},(err,questions)=> {
		return res.json(util.Result(questions))
	})
}

exports.detail = function (req,res) {
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((me_id)=> {
		let fields = req.body
		let question_id = fields.question_id
		Question.findById(question_id)
			.populate('category')
			.exec((err,question)=> {
				if (!question) {
					return res.json(util.Result(1))
				}
				// 深拷贝一份对象
				let detail_question = util.copyObj(question)
				Comment.count({question_id: question._id,answer_id: undefined},(err,commentSum)=> {
						// 寻找关注状态信息
						Attention.getAttentionQuestion(me_id,question._id,({attentionSum,attentionStatus})=> {
						// 寻找提出问题用户信息
						self.detailUser(detail_question,me_id,(detail_question)=> {
							detail_question.commentSum = commentSum
							detail_question.attentionStatus = attentionStatus
							detail_question.attentionSum = attentionSum
							return res.json(util.Result({detail_question}))
						})
					})
				})
			})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.detailUser = function (detail_question,me_id,callback) {
	Question.findById(detail_question._id)
	.populate({
		path: 'user_id',
		select: '_id info avatar username fans'
	})
	.exec((err,question)=>{
		let target = question.user_id
		detail_question.user = util.copyObj(target)
		Follow.getUserBind(target._id,me_id,(followStatus)=> {
			Question.count({user_id: target._id},(err,questionSum)=> {
				Answer.count({user_id: target.id},(err,answerSum)=> {
					detail_question.user.followStatus = followStatus
					detail_question.user.questionSum = questionSum
					detail_question.user.answerSum = answerSum
					detail_question.user.fansSum = target.fans.length
					callback(detail_question)
				})
			})
		})
	})

}