var User = require('./controller/user.js');
var Question = require('./controller/question.js')
var Answer = require('./controller/answer.js')
var Index = require('./controller/index.js')
var Comment = require('./controller/comment.js')

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
	app.post('/question/detail',Question.detail)
	app.post('/answer/insert',Answer.insert)
	app.get('/answer/test',Answer.test)
	app.post('/answer/read',Answer.read)
	app.post('/comment/insert',Comment.insert)
	app.post('/comment/read',Comment.read)
	app.post('/comment/getConversation',Comment.getConversation)
	app.get('/comment/test',Comment.test)
}