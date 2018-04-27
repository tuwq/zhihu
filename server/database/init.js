const mongoose = require('mongoose');
const util = require('../common/util.js');
// 加载资源目录
var path = __dirname + '/schema'
util.walk(path);
path = __dirname + '/models'
util.walk(path);

var db = mongoose.connect('mongodb://localhost:27017/zhihu')

mongoose.connection.once('open', () => {
    console.log('数据库连接成功')
})

module.exports = db;
