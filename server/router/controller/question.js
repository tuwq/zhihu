var mongoose = require('mongoose')
var Question = mongoose.model('Question')
var Category = mongoose.model('Category')
var Comment = mongoose.model('Comment')
const util = require('../../common/util.js');
var common = require('./common.js')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

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
		})
		return res.json(util.Result(0))
	}).catch((err)=> {
		return res.json(util.Result(1))
	})
}

exports.read = function (req,res) {
	var fields = req.body
	var limit = fields.limit
	var page = fields.page
	var skip = limit*(page-1)
	Question.count((err,ct)=> {
		Question.find({})
		.populate('category')
		.populate('user_id')
		.limit(limit)
		.skip(skip)
		.sort({'meta.updatedAt': -1})
		.exec((err,questions)=> {
			getCommentCount(questions,(questions)=> {
				getVote(questions,(questions)=>{
					let count = questions.length;
					return res.json(util.Result({questions: questions,count: count}))
				})
			})
		})
	})
}

function getCommentCount(questions,callback) {
	(function iterator(i){
		if (i == questions.length) {
			callback(questions)
			return 
		}
		Comment.count({question_id: questions[i]._id,answer_id: undefined},(err,cCount)=> {
			questions[i].cCount = cCount
			iterator(i+1)
		})
	})(0)
}

function getVote(questions,callback) {
	(function iterator(i){
		if (i == questions.length) {
			callback(questions)
			return 
		}
		common.getVoteQuestion(questions[i]._id,({good,bad})=> {
			questions[i].good = good
			questions[i].bad = bad
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
	let fields = req.body
	let question_id = fields.question_id
	Question.findById(question_id)
		.populate('category')
		.populate('user_id')
		.exec((err,question)=> {
			if (!question) {
				return res.json(util.Result(1))
			}
			return res.json(util.Result(question))
		})
}