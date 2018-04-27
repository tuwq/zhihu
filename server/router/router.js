var User = require('./controller/user.js');

module.exports = function (app) {
	app.get('/login',User.toLogin)
}