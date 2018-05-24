var mongoose = require('mongoose')
var User = mongoose.model('User')
var Answer = mongoose.model('Answer')
var Question = mongoose.model('Question')
var Comment = mongoose.model('Comment')
var Vote = require('./vote.js')
var Follow = require('./follow.js')
var Attention = require('./attention.js')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')
var formidable = require('formidable');
var path = require('path')
var fs = require('fs')
var gm = require('gm')

const self = this

exports.pwLogin = function (req,res) {
	var fields = req.body;
	User.findOne({telphone: fields.telphone})
		.exec((err,dbUser) => {
			if(err) {
				console.log(err)
			} 
			if(!dbUser) {
				return res.json(util.Result('该手机未注册',1))
			}
			dbUser.comparePassword(fields.password,dbUser.password).then((isMath) => {
				if(!isMath){
					dbUser.incLoginAttepts(dbUser);
					return res.json(util.Result('密码错误',1))
				}
				// 生成token,内部包含了用户id
				const token = tokenUtil.setToken({_id: dbUser._id})
				return res.json(util.Result({token: token}))
			})
		});
}

exports.getCode = function (req,res) {
	var fields = req.body;
	// 查询手机号是否存在
	if(fields.telphone.length === 0) {
		return res.json(util.Result('手机号不能为空',1))	
	}
	User.findOne({telphone: fields.telphone}, (err,user) => {
		if (err) {
			console.log(err)
		}
		if (user&&fields.action=='regist') {
			// 存在，给予错误信息
			return res.json(util.Result('该手机号已注册',1))
		}
		// 不存在返回验证码,将验证码存储在cookie中
		var result = util.getPhoneCode(6)	
		res.cookie('phoneCode', result, {maxAge: 3600,signed: true,httpOnly: true})
		return res.json(util.Result({phoneCode:result}))
	})
}

exports.phoneLogin = function (req,res) {
	var fields = req.body;	
	if(checkUtil.isEmtry([fields.telphone,fields.vCode])) {
		return res.json(util.Result('信息不完整',1))
	}
	// TODO 手机号验证
	var vCode = req.signedCookies.phoneCode
	if(!checkUtil.isSame(fields.vCode,vCode)){
		return res.json(util.Result('手机验证码错误',1))
	}
	User.findOne({telphone: fields.telphone})
		.exec((err,dbUser)=> {
			if(!dbUser) {
				return res.json(util.Result('该手机未注册',1))
			}
			// token
			const token = tokenUtil.setToken({_id: dbUser._id})
			return res.json(util.Result({token: token}))
		})
}

exports.test = function (req,res) {	
	User.find({},(err,users)=> {
		return res.json(util.Result(users))
	})
}

exports.test2 = function (req,res) {
	return res.json(util.Result('信息不完整',1))
}

exports.toRegist = function (req,res) {

	var fields = req.body;
	if(checkUtil.isEmtry([fields.telphone,fields.vCode,fields.password])) {
		return res.json(util.Result('信息不完整',1))
	}
	// TODO 手机号验证
	//console.log(req.cookies);  //获取未加密的cookie  
    var vCode = req.signedCookies.phoneCode;   //获取加密的cookie  
	if(!checkUtil.isSame(fields.vCode,vCode)) {
		return res.json(util.Result('手机验证码错误',1))
	}
	// TODO 密码强度验证
	User.findOne({telphone: fields.telphone},(err,dbUser) => {
		if (dbUser) {
			return res.json(util.Result('该手机号已注册',1))
		}
		const user = new User({
			telphone: fields.telphone,
			vCode: vCode,
			password: fields.password
		})
		user.save()
		return res.json(util.Result(0))
	})
}

exports.getNowUserInfo = function (req,res) {
	// 客户端每次在请求头中携带token
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=>{
		// 得到用户信息
		User.findOne({_id: _id})
			.select('_id username avatar hobby info')
			.exec( (err,dbUser) => {
				if (err) {
					console.log(err)
				}
				return res.json(util.Result(dbUser))
			})
	}).catch((err)=> {
		// token到期或伪造
		return res.json(util.Result(401))
		// return res.status(401)
	})
}

exports.getIdByToken = function (req,res) {
	// 客户端每次在请求头中携带token
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=>{
		return res.json(util.Result({_id: _id}))
	}).catch((err)=> {
		// token到期或伪造
		return res.json(util.Result(401))
	})
}
exports.getInfoById = function (target_id,callback) {
	User.findById(target_id)
		.select('_id username avatar hobby info')
		.exec((err,dbUser)=> {
			if(!dbUser) {
				callback(null)
			}
			callback(dbUser)
		})
}

exports.saveInfo = function (req,res) {
	 var token = req.headers.token;
	 tokenUtil.verifyToken(token)
	 .then((_id)=> {
      	var user = req.body.user;
      	User.findById(_id,(err,dbUser)=> {
      		if(err){
      			console.log(err)
      		}
      		if (!dbUser) {
      			return res.json(util.Result(1))
      		}
      		dbUser.username = user.username
      		dbUser.info = user.info;
      		dbUser.save();
      		return res.json(util.Result(0))
      	})
	 }).catch((err)=> {
	 	return res.json(util.Result(401))
	 })
}

exports.setAvatar = function (req,res) {
	// 解决ajaxFileUpload传送时MINE类型的问题
	// 请求格式不同
	res.header('content-type','text/html')
	var form = new formidable.IncomingForm();
	// 存放文件的根目录 	   zhihu\static\avatar
    form.uploadDir  = path.normalize(__dirname+'/../../../static/avatar');
    form.parse(req, function(err, fields, files) {
    	var size = fields.avatar_size;
    	// 页面文本框中的name一定要取名
       	var extname = path.extname(files.avatar.name)
       	var oldpath = files.avatar.path;
       	// 存放文件的路径为 zhihu\static\avatar\160\id.png
       	var newpath = path.normalize(__dirname+'/../../../static/avatar/arbitrary')+'\\'+fields._id+'_'+files.avatar.name;
       	fs.rename(oldpath,newpath,(err)=> {
       		if (err) {
       			return res.json(util.Result(1))	
       		}else {
       			req.session.avatar = fields._id+'_'+files.avatar.name;
       			return res.json(util.Result({path: newpath}))
       		}
       	})
    });
}
exports.cut = function (req,res) {
	var token = req.headers.token;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		var fields = req.body;
		const x = fields.x
		const y = fields.y
		const w = fields.w
		const h = fields.h
		var rootPath = path.normalize(__dirname+'/../../../static/avatar')
		User.findById(_id,(err,dbUser)=> {
 			if (!dbUser) {
        		return res.json(util.Result(401))
        	}
        	util.gmImage(rootPath,'arbitrary',req.session.avatar,{x,y,w,h},[24,25,30,34,38,60,160],(err)=> {
		 		if (err) {
		 			return res.json(util.Result(1))
		 		}
		 		dbUser.avatar = req.session.avatar
	        	dbUser.save();
      			return res.json(util.Result(0))
		 	})
      	})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.readApprove = function (user,callback) {
	// 读取粉丝数，关注数，赞同数，问题数，提问数，回答数
	User.findById(user._id)
	.select('fans followers approve')
	.exec((err,dbUser)=> {
		let fansSum = dbUser.fans.length 
		let followerSum = dbUser.followers.length 
		let approveSum = dbUser.approve 
		Question.count({user_id: user._id},(err,questionSum)=> {
			Answer.count({user_id: user._id},(err,answerSum)=> {
				user.fansSum = fansSum
				user.followerSum = followerSum
				user.approveSum = approveSum
				user.questionSum = questionSum
				user.answerSum = answerSum
				callback(user)
			})
		})
	})
}

exports.readUserAnswer = function (req,res) {
	// 该用户的信息
	// 读取用户的回答列表
	// 寻找每个回答相关信息
	// 这个回答的问题标题
	// 这个回答的赞同数
	// 我是否赞同了这个回答
	var token = req.headers.token;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		let fields = req.body
		Answer.find({user_id: fields.detail_id},(err,answers)=> {
			self.getAnswersInfo(answers,_id,(answers,infos)=>{
				return res.json(util.Result({answers,infos}))
			})
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.getAnswersInfo =  function (answers,me_id,callback) {
	// 寻找每个回答相关信息
	// 每个回答的问题标题
	// 每个回答的赞踩数
	// 我是否赞同了这个回答
	// 该回答的评论数
	let infos = [];
	(function iterator(i){
		if ( i === answers.length ) {
			return callback(answers,infos)
		}
		Question.findById(answers[i].question_id)
		.select('_id title')
		.exec((err,question)=> {
			Comment.count({answer_id: answers[i]._id},(err,commentSum)=> {
				Vote.getVoteAnswer(answers[i]._id,me_id,({good,bad,voteStatus})=> {
					infos.push({
						questionTitle: question.title,
						good,bad,voteStatus,commentSum
					})
					iterator( i+1 )
				})
			})
		})
	})(0)
}

exports.readUserQuestion = function (req,res) {
	var token = req.headers.token;
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		// 读取我的所有问题
		// 每个问题的回答数，这个问题所关注的人数
		let fields = req.body
		Question.find({user_id: fields.detail_id})
		.select('_id meta title')
		.exec((err,questions)=> {
			self.getQuestionInfo(questions,_id,(questions,infos)=> {
				return res.json(util.Result({questions,infos}))
			})
		})
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}

exports.getQuestionInfo = function (questions,me_id,callback) {
	let infos = [];
	(function iterator(i){
		// 每个问题的回答数，这个问题所关注的人数
		if ( i === questions.length ) {
			return callback(questions,infos)
		}
		Answer.count({question_id: questions[i]._id},(err,answerSum)=> {
			Attention.getAttentionQuestion(me_id,questions[i]._id,({attentionSum,attentionStatus})=> {
				infos.push({
					answerSum,attentionSum,attentionStatus
				})
				iterator( i+1 )
			})
		}) 
	})(0)
}




exports.detail = function (req,res) {
	let fields = req.body
	var token = req.headers.token;
	tokenUtil.verifyToken(token)
	.then((me_id)=> {
		let people_type = 0
		let fields = req.body
		if ( me_id === fields.detail_id ) {
			// 是我本人的主页
			people_type = 1 
			self.getInfoById(me_id,(user)=>{
				// 数量相关信息
				let people_detail_user = util.copyObj(user)
				self.readApprove(people_detail_user,(people_detail_user)=>{
					return res.json(util.Result({people_detail_user,people_type}))
				})
			})
		}else {
			people_type = 2
			// 不是我本人首页，我是否关注了该用户
			Follow.getUserBind(fields.detail_id,me_id,(followStatus)=>{
				// 获得信息
				self.getInfoById(fields.detail_id,(user)=>{
					let people_detail_user = util.copyObj(user)
					self.readApprove(people_detail_user,(people_detail_user)=>{
						people_detail_user.followStatus = followStatus
						return res.json(util.Result({people_detail_user,people_type}))
					})
				})
			})
		}
	}).catch((err)=> {
		return res.json(util.Result(401))
	})
}






