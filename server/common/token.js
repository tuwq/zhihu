const jwt = require("jsonwebtoken");
var content = { person: "tuwq" }// 要生成token的主题信息
// var secretOrPrivateKey="115112312asdasa"; // 这是加密的key（密钥） 

exports.setToken = function (secretOrPrivateKey) {
    var token = jwt.sign(content,secretOrPrivateKey,{
        expiresIn: 60*60*24  // 24小时过期
    })
    return token;
}
 

exports.verifyToken  =  function(token,secretOrPrivateKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token,secretOrPrivateKey, function(err,decode) { 
            if (err) {  //  时间失效的时候/ 伪造的token          
               reject(err)
            }else {
                if(decode.person==content.person) {
                    resolve(token)
                }
            }
        })
    })
}

// var token = this.setToken('wi')
// this.verifyToken(token,'wi')
// .then((token)=>{
//     console.log('成功')
// }).catch(function (err) {
//     console.log('失败');
// });




