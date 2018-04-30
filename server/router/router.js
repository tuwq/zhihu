var User = require('./controller/user.js');

module.exports = function (app) {
	app.post('/user/phoneLogin',User.phoneLogin)
	app.post('/user/pwLogin',User.pwLogin)
	app.post('/user/getCode',User.getCode)
	app.get('/user/test',User.test)
	app.get('/user/test2',User.test2)
	app.post('/user/regist',User.toRegist)
}