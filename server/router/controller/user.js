var mongoose = require('mongoose')
var User = mongoose.model('User')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')
const redis = require('../../common/redis.js')

exports.pwLogin = function (req,res) {
	var fields = req.body;
	User.findOne({telphone: fields.telphone})
		.exec((err,dbUser) => {
			if(err) {
				console.log(err)
			} 
			if(!dbUser) {
				res.json(util.Result('该手机未注册',1))
				return
			}
			dbUser.comparePassword(fields.password,dbUser.password).then((isMath) => {
				if(!isMath){
					dbUser.incLoginAttepts(dbUser);
					res.json(util.Result('密码错误',1))
					return
				}
				req.session.user = dbUser
				// 生成token,将token和用户信息放入redis
				const token = tokenUtil.setToken(dbUser.telphone)
				return res.json(util.Result({token: token}))
			})
		});
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
		if (user&&fields.action=='regist') {
			// 存在，给予错误信息
			res.json(util.Result('该手机号已注册',1))
			return;
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
		res.json(util.Result('信息不完整',1))
		return;
	}
	// TODO 手机号验证
	var vCode = req.signedCookies.phoneCode
	if(!checkUtil.isSame(fields.vCode,vCode)){
		res.json(util.Result('手机验证码错误',1))
		return
	}
	User.findOne({telphone: fields.telphone})
		.exec((err,dbUser)=> {
			if(!dbUser) {
				res.json(util.Result('该手机未注册',1))
				return
			}
			req.session.user = dbUser
			// 生成token,将token和用户信息放入redis
			const token = tokenUtil.setToken(dbUser.telphone)
			return res.json(util.Result({token: token}))
		})
}

exports.logout = function (req,res) {
	delete req.session.user
	return res.json(util.Result(0))
}
exports.test = function (req,res) {	
	return res.json(util.Result({user: req.session.user}));
}

exports.test2 = function (req,res) {
	delete req.session.user
	return res.json(util.Result('信息不完整',1))
}

exports.toRegist = function (req,res) {

	var fields = req.body;
	if(checkUtil.isEmtry([fields.telphone,fields.vCode,fields.password])) {
		res.json(util.Result('信息不完整',1))
		return;
	}
	// TODO 手机号验证
	//console.log(req.cookies);  //获取未加密的cookie  
    var vCode = req.signedCookies.phoneCode;   //获取加密的cookie  
	if(!checkUtil.isSame(fields.vCode,vCode)) {
		res.json(util.Result('手机验证码错误',1))
		return
	}
	// TODO 密码强度验证
	User.findOne({telphone: fields.telphone},(err,dbUser) => {
		if (dbUser) {
			res.json(util.Result('该手机号已注册',1))
			return
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

exports.getInfoByToken = function (req,res) {
	var user = req.session.user;
	// 验证token
	tokenUtil.verifyToken(req.body.token,user.telphone)
	.then((token)=> {
		res.json(util.Result({_id: user._id,username: user.username}))
	})
	.catch((err)=> {
		res.json(util.Result(1))
	})
	return
}
