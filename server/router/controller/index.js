var mongoose = require('mongoose')
var User = mongoose.model('User')
const util = require('../../common/util.js');
const checkUtil = require('../../common/checkUtil.js')


exports.checkLoginStaus = function (req,res) {
	if (!req.session.user) {
		// 未登录返回1
		return res.json(util.Result(1))
	}else{
		user = req.session.user
		User.findOne({_id:user._id})
			.exec( (err,dbUser) => {
				return res.json(util.Result(dbUser))
			})
	}
}