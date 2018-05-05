const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000	
const db = require('./database/init.js')
const app = express()
const cookieParase = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongo')(session);
var mime = require('mime');

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

// 加载路由
require('./router/router.js')(app);

app.use(express.static('../dist'))

app.listen(port,() => {
	console.log('run to ' + port);
});

