const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000
const db = require('./database/init.js')

const app = express()
// 加载路由
require('./router/router.js')(app);




app.use(express.static('../dist'))
app.listen(port,() => {
	console.log('run to ' + port);
});