var mongoose = require('mongoose')
var Answer = mongoose.model('Answer')
var Question = mongoose.model('Question')
var Comment = mongoose.model('Comment')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

exports.insert = function (req,res) {
	// 检查登录
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		if(checkUtil.isEmtry(fields.content)) {
			return res.json(util.Result('信息不完整',1))
		}
		if(checkUtil.isEmtry([fields.user_id,fields.question_id,fields.answer_id])) {
			return res.json(util.Result('id缺失',1))
		}
		let comment
		// 当to 不存在，说明是根评论
		if (!fields.to) {
			comment = new Comment({
				content: fields.content,
				question_id: fields.question_id,
				answer_id: fields.answer_id,
				user_id: fields.user_id,
			})
		}else{	
			comment = new Comment({
				content: fields.content,
				question_id: fields.question_id,
				answer_id: fields.answer_id,
				user_id: fields.user_id,
				to: fields.to
			})
		}
		comment.save()
		return res.json(util.Result(0))
	}).catch((err)=> {
		return res.json(util.Result(401))
	})

}

exports.read = function (req,res) {
	let fields = req.body
	Comment.find({answer_id: fields.answer_id})
	.populate('user_id')
	.exec((err,comments)=> {
		return res.json(util.Result({comments: comments}))
	})
}

exports.test = function (req,res) {
	Comment.find({},(err,comments)=> {
		res.json(util.Result(comments))
	})
}