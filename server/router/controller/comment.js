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
		if(checkUtil.isEmtry([fields.user_id,fields.question_id])) {
			return res.json(util.Result(401))
		}
		// 检查是回复回答还是回复评论
		if(checkUtil.isEmtry(fields.answer_id)&&checkUtil.isEmtry(fields.to)) {
			return res.json(util.Result('都空',1))
		}
		// 既回复回答又回复评论也不行
		if (!checkUtil.isEmtry(fields.answer_id)&&checkUtil.isEmtry(fields.to)) {
			return res.json(util.Result('都不空',1))
		}
		let comment
		if (!checkUtil.isEmtry(fields.answer_id)) {
			comment = new Comment({
				content: fields.content,
				question_id: fields.question_id,
				answer_id: fields.answer_id,
				user_id: _id
			})
		}else if(!checkUtil.isEmtry(fields.to)){
			// 是不是回复你自己
			Comment.findById(fields.to,)
			.select('user_id')
			.exec((err,dbComment)=> {
				if (dbComment.user_id === _id) {
					return res.json(util.Result('你不能回复你自己',1))
				}else{
					comment = new Comment({
						content: fields.content,
						question_id: fields.question_id,
						to: fields.to,
						user_id: _id
					})
				}	
			})	
		}
		comment.save()
		return res.json(util.Result(0))
	}).catch((err)=> {
		return res.json(util.Result(401))
	})

}

exports.test = function (req,res) {
	Comment.find({},(err,comments)=> {
		res.json(util.Result(comments))
	})
}