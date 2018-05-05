var mongoose = require('mongoose')
var User = mongoose.model('User')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')
var formidable = require('formidable');
var path = require('path')
var fs = require('fs')


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
			// token
			const token = tokenUtil.setToken({_id: dbUser._id})
			return res.json(util.Result({token: token}))
		})
}

exports.test = function (req,res) {	
	return res.status(401)
}

exports.test2 = function (req,res) {
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
exports.getInfoById = function (req,res) {
	User.findOne({_id: req.body._id})
		.select('_id username avatar hobby info')
		.exec((err,dbUser)=> {
			if(err){
				console.log(err)
			}
			if(!dbUser) {
				return res.json(util.Result(1))
			}
			return res.json(util.Result(dbUser))
		})
}

exports.saveInfo = function (req,res) {
	 var token = req.headers.token;
	 tokenUtil.verifyToken(token)
	 .then((_id)=> {
      	var user = req.body.user;
      	User.findById(user._id,(err,dbUser)=> {
      		if(err){
      			console.log(err)
      		}
      		if (!dbUser) {
      			return res.json(util.Result(1))
      		}
      		dbUser.info = user.info;
      		dbUser.save();
      		return res.json(util.Result(0))
      	})
	 }).catch((err)=> {
	 	return res.json(util.Result(401))
	 })
}

exports.setAvatar = function (req,res) {
	res.header('content-type','text/html')
	var form = new formidable.IncomingForm();
	console.log(req.body)
	// 存放文件的根目录 C:\zhihu\static\avatar
    form.uploadDir  = path.normalize(__dirname+'/../../../static/avatar');
    form.parse(req, function(err, fields, files) {
       
    	res.json(util.Result(fields.avatar_size))
    });
}
