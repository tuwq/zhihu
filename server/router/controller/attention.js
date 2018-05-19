var mongoose = require('mongoose')
const util = require('../../common/util.js');
const QuestionUser = mongoose.model('QuestionUser')
const User = mongoose.model('User')
const Answer = mongoose.model('Answer')
const Follow = require('./follow.js')
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

exports.attentionQuestionRed = function (req,res) {
	// 关注问题
	// 检查登录
	var token = req.headers.token
	var fields = req.body;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		// 检查字段
		if(checkUtil.isEmtry([fields.question_id])) {
			return res.json(util.Result('信息不完整',1))
		}
		// 读取该问题下所有关注者
		QuestionUser.find({question_id: fields.question_id,attentionStatus: 1})
		.populate('user_id')
		.sort({'meta.updatedAt': -1})
		.exec((err,binds)=> {
			let sum = binds.length 
			getUserListInfo(binds,_id,(users,infos)=> {
				return res.json(util.Result({sum: sum,users: users,infos: infos}))
			})
		})

	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

function getUserListInfo(binds,_id,callback) {
	var users = [];
	var infos = [];
	(function iterator(i){
		if (i==binds.length) {
			return callback(users,infos)
		}
		var user = binds[i].user_id
		// 寻找该用户的回答数和粉丝数
		Answer.count({user_id: user._id},(err,count)=> {
			User.findById(user._id)
			.select('fans')
			.exec((err,dbUser)=> {
				// 寻找当前用户和目标用户的关注关系
				Follow.getUserBind(user._id,_id,(status)=> {
					infos.push(new Info({
						answerSum: count,
						fansLength: dbUser.fans.length,
						followStatus: status
					}))
					users.push(user)
					iterator(i+1)	
				})	
			})
		})
	})(0)
}

function Info({answerSum,fansLength,followStatus}) {
	this.answerSum = answerSum
	this.fansLength = fansLength
	this.followStatus = followStatus
}

exports.getAttentionQuestion = function(user_id,question_id,callback) {
	QuestionUser.count({question_id: question_id,attentionStatus: 1},(err,sum)=> {
		// 当前用户是否关注了这个问题
		QuestionUser.findOne({question_id: question_id,user_id: user_id},(err,bind)=> {
			if (!bind) {
				return callback({sum: sum,attentionStatus: 0})
			}
			callback({sum: sum,attentionStatus: bind.attentionStatus})
		})
	})
}