var mongoose = require('mongoose')
const util = require('../../common/util.js');
const QuestionUser = mongoose.model('QuestionUser')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

exports.attentionQuestionAdd = function (req,res) {
	// 关注问题
	// 检查登录
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		// 检查字段
		if(checkUtil.isEmtry([fields.question_id,fields.user_id,fields.status])) {
			return res.json(util.Result('信息不完整',1))
		}
		// 没有关注过这个问题
		// 关注这个问题
		// 需要关系表
		QuestionUser.findOne({question_id: fields.question_id,user_id: fields.user_id},(err,dbBind)=> {
			if (!dbBind) {
				let questionUser = new QuestionUser({
					question_id: fields.question_id,
					user_id: fields.user_id,
					attentionStatus: fields.status
				})
				questionUser.save()
			}else {
				dbBind.attentionStatus = fields.status
				dbBind.save()
			}
			if (fields.status==1) {	
				return res.json(util.Result(1))
			}else {
				
				return res.json(util.Result(0))
			}
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.getAttentionQuestion = function(user_id,question_id,callback) {
	QuestionUser.count({question_id: question_id,attentionStatus: 1},(err,sum)=> {
		QuestionUser.findOne({question_id: question_id,user_id: user_id},(err,bind)=> {
			if (!bind) {
				return callback({sum: sum,attentionStatus: 0})
			}
			callback({sum: sum,attentionStatus: bind.attentionStatus})
		})
	})
}