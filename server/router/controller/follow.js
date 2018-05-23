var mongoose = require('mongoose')
const util = require('../../common/util.js');
var User = mongoose.model('User')
var Question = mongoose.model('Question')
var Comment = mongoose.model('Comment')
var Answer = mongoose.model('Answer')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')

const self = this

exports.followTarget = function (req,res) {
	// 检查登录
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		// 根据目标id寻找目标
		var fields = req.body;
		if (fields.action == 1) {
			follow(req,res,_id,fields)
		}else {
			cancel(req,res,_id,fields)
		}
	}).catch((err)=> {
		return res.json(util.Result(1))
	})
}

function follow (req,res,_id,fields) {
	// 将本人id添加至目标的粉丝列表中
	User.findById(fields.target_id)
	.select('fans')
	.exec((err,target)=> {
		let fans = target.fans
		if (fans.indexOf(_id)!=-1) {
			return res.json(util.Result('以关注了该用户',1))
		}
		fans.push(_id)
		// 将目标id添加至本人关注列表中
		User.findById(_id)
		.select('followers')
		.exec((err,me)=> {
			let followers = me.followers
			if (followers.indexOf(fields.target_id)!='-1') {
				return res.json(util.Result('以关注了该用户',1))
			}
			followers.push(fields.target_id)
			target.save()
			me.save()
			return res.json(util.Result(0))
		})
	})
}

function cancel (req,res,_id,fields) {
	// 将本人id从目标的粉丝列表中删除
	User.findById(fields.target_id)
	.select('fans')
	.exec((err,target)=> {
		let fans = target.fans
		if (fans.indexOf(_id) == -1) {
			return res.json(util.Result('以取消关注了该用户',1))
		}
		// 除了基本类型外都是引用传递
		fans.splice(fans.indexOf(_id),1)
		// 将目标id从本人关注列表中删除
		User.findById(_id)
		.select('followers')
		.exec((err,me)=> {
			let followers = me.followers
			if (followers.indexOf(fields.target_id) == -1 ) {
				return res.json(util.Result('以取消关注了该用户',1))
			}
			followers.splice(followers.indexOf(fields.target_id),1)
			target.save()
			me.save()
			return res.json(util.Result(0))
		})
	})
}

exports.userBind = function (req,res) {
	// 检查登录
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		let fields = req.body
		// 寻找用户关注关系
		User.findById(fields.detail_id)
		.select('fans')
		.exec((err,target)=> {
			User.findById(_id)
			.select('followers')
			.exec((err,me)=> {
				if (target.fans.indexOf(_id)!=-1 && me.followers.indexOf(fields.detail_id)!=-1) {
					return res.json(util.Result({ fllowerStatus: 1}))
				}
				return res.json(util.Result({ fllowerStatus: 0}))
			})
		})
	}).catch((err)=> {
		return res.json(util.Result(1))
	})
}

exports.getUserBind = function(target_id,me_id,callback) {
	User.findById(target_id)
	.select('fans')
	.exec((err,target)=> {
		User.findById(me_id)
		.select('followers')
		.exec((err,me)=> {
			if ( target.fans.indexOf(me_id)!=-1 && me.followers.indexOf(target_id)!=-1 ) {
				callback(1)
			}else {
				callback(0)
			}
		})
	})
}

exports.userFans = function(req,res) {
	// 检查登录
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		let fields = req.body
		User.findById(fields.detail_id)
		.select('avatar username')
		.populate('fans')
		.exec((err,user)=> {
			// 所有粉丝对象
			let fans = user.fans
			// 寻找每个粉丝的回答数和关注列表人数
			getFansData(fans,_id,(infos)=> {
				return res.json(util.Result({users: fans,infos: infos}))
			})
		})
	}).catch((err)=> {
		return res.json(util.Result(1))
	})
}

function getFansData(fans,_id,callback) {
	var infos = [];
	(function iterator(i){
		if ( i == fans.length ) {
			return callback(infos)
		}
		// 当前用户是否关注过该粉丝列表中的用户
		self.getUserBind(fans[i]._id,_id,(flowerStatus)=> {
			Answer.count({user_id: fans[i]._id})
			.exec((err,answerSum)=> {
				infos.push({
					answerSum: answerSum,
					followSum: fans[i].followers.length,
					flowerStatus
				})
				iterator( i+1 )
			})
		})
	})(0)
}


exports.userFollow = function (req,res) {
	var token = req.headers.token
	tokenUtil.verifyToken(token)
	.then((_id)=> {
		let fields = req.body
		User.findById(fields.detail_id)
		.populate({
			path: 'followers',
			select: '_id avatar username info'
		})
		.exec((err,user)=> {
			// 获得用户关注列表信息
			let followers = user.followers
			getFollowsData(followers,_id,(infos)=> {
				return res.json(util.Result({users: followers,infos}))
			})
		})
	}).catch((err)=> {
		return res.json(util.Result(1))
	})
}

function getFollowsData (followers,_id,callback) {
	let infos = [];
	(function iterator(i){
		if (i==followers.length) {
			return callback(infos)
		}
		// 当前用户是否关注过该关注列表中的用户
		self.getUserBind(followers[i]._id,_id,(flowerStatus)=> {
			// 查询回答数，提问数，被回答数
			Answer.count({user_id: followers[i]._id},(err,answerSum)=> {
				Question.find({user_id: followers[i]._id})
				.select('_id')
				.exec((err,questions)=> {
					// 遍历问题，寻找每个问题下有多少个回答
					getAnsweredSum(questions,(answeredSum)=> {
						infos.push({
							answerSum,
							questionSum: questions.length,
							answeredSum,
							flowerStatus
						})
						iterator( i+1 )
					})
				})
			})
		})
	})(0)
}

function getAnsweredSum(questions,callback) {
	let answeredSum = 0;
	(function iterator(i){
		if ( i===questions.length ) {
			return callback(answeredSum)
		}
		Answer.count({question_id: questions[i]._id},(err,count)=> {
			answeredSum += count
			iterator( i+1 )
		})
	})(0)
}

