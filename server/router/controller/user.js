var mongoose = require('mongoose')
var User = mongoose.model('User')
const util = require('../../common/util.js');

exports.toLogin = function (req,res) {
	
}

exports.getCode = function (req,res) {
	var fields = req.body;
	// 查询手机号是否存在
	if(fields.telphone.length === 0) {
		res.json(util.Result('手机号不能为空',1))
		return
	}
	User.findOne({telphone: fields.telphone}, (err,user) => {
		if (err) {
			console.log(err)
		}
		if (user) {
			// 存在，给予错误信息
			res.json(util.Result('该手机号已注册',1))
			return;
		}
		// 不存在返回验证码,将验证码存储在cookie中
		var result = util.getPhoneCode(6)	
		res.cookie('phoneCode', result, {maxAge: 3600})
		res.json(util.Result({phoneCode:result}))
	})
}

exports.test = function (req,res) {
	var result = util.getPhoneCode(6)	
	res.json(util.Result('信息错误',1));
}

exports.toRegist = function (req,res) {
	var fields = req.body;
	if (util.isEmpty(fields.telphone)||util.isEmpty(fields.vCode)) {
		return;
	}
	User.findOne({telphone: fields.telphone},(err,dbUser) => {
		if(err) {
			console.log(err)
		}
		if (dbUser) {
			// 存在，给予错误信息
			res.json(util.Result('该手机号已注册',1))
			return;
		}
		// 不存在则填充信息
		const user = new User({
			telphone: fields.telphone
		})
		user.save();
		res.json(util.Result(0));
	})
}