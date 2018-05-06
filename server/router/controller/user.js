var mongoose = require('mongoose')
var User = mongoose.model('User')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')
const tokenUtil = require('../../common/token.js')
var formidable = require('formidable');
var path = require('path')
var fs = require('fs')
var gm = require('gm')


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
		// gm(rootPath+'/arbitrary/'+req.session.avatar).crop(w,h,x,y).resize(24,24,'!')
		// .write(rootPath+'/24/'+req.session.avatar,function (err) {
	 //        if (err) {
	 //            return res.json(util.Result(1));     
	 //        }
	 //        User.findById(_id).select('avatar').exec((err,dbUser)=> {
	 //        	if (!dbUser) {
	 //        		return res.json(util.Result(401))
	 //        	}
	 //        	dbUser.avatar = req.session.avatar
	 //        	dbUser.save()
	 //        	return res.json(util.Result(0))
	 //        })
	 //    });
		User.findById(_id,(err,dbUser)=> {
 			if (!dbUser) {
        		return res.json(util.Result(401))
        	}
        	util.gmImage(rootPath,'arbitrary',req.session.avatar,{x,y,w,h},[24,25,30,34,38,160],(err)=> {
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


// 裁图片，需要 24 25 30 34 38 160 尺寸
		// gm(rootPath+'/arbitrary/'+req.session.avatar).crop(w,h,x,y).resize(24,24,'!')
		// .write(rootPath+'/24/'+req.session.avatar,function (err) {
	 //        if (err) {
	 //            return res.json(util.Result(1));     
	 //        }
	 //        User.findById(_id).select('avatar').exec((err,dbUser)=> {
	 //        	if (!dbUser) {
	 //        		return res.json(util.Result(401))
	 //        	}
	 //        	dbUser.avatar = req.session.avatar
	 //        	dbUser.save()
	 //        	res.json(util.Result(0))
	 //        })
	 //    });




