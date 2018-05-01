// var Redis = require('ioredis');
// var redis = new Redis();


//  依靠token存储用户信息
// exports.saveUserInfo = function (token,user) {
// 	client.hset(token.toString(),{
// 		username: user.username,
// 		_id: user._id,
// 		intro: user.intro,
// 		info: user.info
// 	});
// }

// exports.getUserByToken = function (token) {
// 	client.hgetall(token.toString(), (err,obj) => {
// 		console.log(obj)
// 		if (err) {
// 			console.log(err)
// 		} else{
// 			return obj
// 		} 
// 	})
// }

// client.hmset('user',{username: 'tuwq',password: '123'})
// client.hgetall('user', (err,obj) => {
// 	console.log(obj)
// })
