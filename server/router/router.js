var User = require('./controller/user.js');
var Index = require('./controller/index.js')

module.exports = function (app) {
	app.post('/user/phoneLogin',User.phoneLogin)
	app.post('/user/pwLogin',User.pwLogin)
	app.post('/user/getCode',User.getCode)
	app.post('/user/regist',User.toRegist)
	app.get('/user/logout',User.logout)
	app.post('/user/getInfoByToken',User.getInfoByToken)
	app.get('/user/test',User.test)
	app.get('/user/test2',User.test2)
	app.get('/index/checkLoginStaus',Index.checkLoginStaus)
}