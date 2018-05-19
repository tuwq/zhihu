var mongoose = require('mongoose')
const util = require('../../common/util.js');
var User = mongoose.model('User')
var Question = mongoose.model('Question')
var Comment = mongoose.model('Comment')
var Answer = mongoose.model('Answer')
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')


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
