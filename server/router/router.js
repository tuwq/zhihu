var User = require('./controller/user.js');

module.exports = function (app) {
	app.get('/user/login',User.toLogin)
	app.post('/user/getCode',User.getCode)
	app.get('/user/test',User.test)
	app.post('/user/regist',User.toRegist)
}