const jwt = require("jsonwebtoken");
// var content = { id: "123" }// 要生成token的主题信息
var secretOrPrivateKey="tuwq"; // 这是加密的key（密钥） 
var mongoose = require('mongoose')
var User = mongoose.model('User')


exports.setToken = function (content) {      //id
    var token = jwt.sign(content,secretOrPrivateKey,{
        expiresIn: 60*60*24  // 24小时过期
    })
    return token;
}
exports.verifyToken  =  function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token,secretOrPrivateKey, function(err,decode) { 
            if (err) {  //  时间失效的时候/ 伪造的token          
               reject(err)
            }else {
               // 返回解析出的id
               resolve(decode._id)
            }
        })
    })
}


// 123 8 => 666
// 666 8 => 123

// var token = this.setToken({_id: 'id111'})
// this.verifyToken()
// .then((id)=>{
//     console.log(id)
//     console.log('成功')
// }).catch(function (err) {
//     console.log('失败');
// });




