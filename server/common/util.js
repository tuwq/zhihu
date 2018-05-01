const fs = require('fs');


 // 日期格式化
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
const util = {
  // 遍历资源目录
  walk : function(path) {
    fs
      .readdirSync(path)
      .forEach(function(file) {
        var newPath = path + '/' + file
        var stat = fs.statSync(newPath)
        //如果是个文件，同时它是个js文件，那么就把它加载进来
        if (stat.isFile()) {
          if (/(.*)\.(js|coffee)/.test(file)) {
            require(newPath)
          }
        }
        //如果是目录继续获得
        else if (stat.isDirectory()) {
          walk(newPath)
        }
      })
  },
  // 获得随机数
  getPhoneCode : function(num) {
       var result = "";
       for( i = 0 ; i < parseInt(num); i++ ){
          result += (parseInt(Math.random()*10)).toString();
       } 
       return  result;
  },
  // 返回结果
  Result : function(obj,errCode) {
    if (arguments.length === 1) {
      if(typeof(obj) == 'number') {
        return {
          status: obj
        }
      }else {
        return {
          status: 0,
          result: obj
        } 
      } 
    }else{
      return {
        status: errCode,
        result: {msg:obj} 
      }
    }
  },
  // 验证手机号
  isPoneAvailable : function (str) {  
      var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
      if (!myreg.test(str)) {  
          return false;  
      } else {  
          return true;  
      }  
  },
  // 密码复杂度
  isPasswdAvailable : function (str) {
    var myreg = /^[A-Za-z0-9]{6,20}$/;
    if (!myreg.test(str)) {
        return false
    } else {
        return true
    }
  }  
} 

module.exports = util


