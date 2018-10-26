const express = require('express');
const path = require('path')
const port = process.env.PORT || 12000	
const db = require('./database/init.js')
const app = express()
const cookieParase = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongo')(session);
var mime = require('mime');
var statistics  = require('./socket/statistics')
var kue = require('./kue/init.js')

app.use(bodyParser.json());
//post处理需要body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParase('tuwq'));
app.use(session({
    secret : 'tuwq',
    resave : false,
    saveUninitialized : true,
    store: new mongoStore({
	    url: 'mongodb://localhost:27017/zhihu',
	    collection: 'sessions'
	})
    //这里中间件不能加cookie
}));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
  	code: 500,
  	message: 'noKnowError'
  });
});

process.on('uncaughtException', function (err) {
  console.log(err)
  console.log(err.stack)
});


// 加载路由
require('./router/router.js')(app);

// app.use(express.static('./dist'))

app.listen(port,() => {
	console.log('run to ' + port);
});

