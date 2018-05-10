var User = require('./controller/user.js');
var Question = require('./controller/question.js')
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
	app.post('/user/setAvatar',User.setAvatar)
	app.post('/user/cut',User.cut)
	app.post('/user/test2',User.test2)
	app.post('/question/insert',Question.insert)
	app.post('/question/read',Question.read)
	app.get('/question/test',Question.test)
}