const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000	
const db = require('./database/init.js')
const app = express()
var session = require("express-session");
const cookieParase = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//post处理需要body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParase());
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
    //这里中间件不能加cookie
}));

// 加载路由
require('./router/router.js')(app);

app.use(express.static('../dist'))

app.listen(port,() => {
	console.log('run to ' + port);
});