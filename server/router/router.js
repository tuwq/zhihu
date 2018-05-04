var User = require('./controller/user.js');
var Index = require('./controller/index.js')

module.exports = function (app) {
	app.post('/user/phoneLogin',User.phoneLogin)
	app.post('/user/pwLogin',User.pwLogin)
	app.post('/user/getCode',User.getCode)
	app.post('/user/regist',User.toRegist)
	app.post('/user/getIdByToken',User.getIdByToken)
	app.post('/user/getNowUserInfo',User.getNowUserInfo)
	app.post('/user/saveInfo',User.saveInfo)
	app.get('/user/test',User.test)
	app.post('/user/getInfoById',User.getInfoById)
	app.post('/user/test2',User.test2)
}