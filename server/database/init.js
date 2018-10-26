const mongoose = require('mongoose');
const util = require('../common/util.js');


// 加载资源目录
var db = mongoose.connect("mongodb://localhost:27017/zhihu", {useNewUrlParser:true, useCreateIndex: true}, function(err){

　　if(err){

　　　　console.log('Connection Error:' + err)

　　}else{

　　　　console.log('Connection success!') }

})

var path = __dirname + '/schema'
util.walk(path);
path = __dirname + '/models'
util.walk(path);

(function(){
	const User = mongoose.model('User')
	User.findOne({username: 'tuwq'},(err,dbUser) => {
		if (!dbUser) {
			const user = new User({
				username: 'tuwq',
				email: 'tuwenq@126.com',
				telphone: '15279167097',
				password: '123asd',
			})
			user.save();
		}
	})
})()

mongoose.connection.once('open', () => {
    console.log('数据库连接成功')
})

module.exports = db;
