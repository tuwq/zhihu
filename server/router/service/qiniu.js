const path = require('path')
const qiniu = require('qiniu')
var accessKey = 'XwXCUlhN-RunaX8r77PBuKZCS7iCoh9pXnz73pT6';
var secretKey = 'uBQYSw1xV9N4hGFouo_bIhQDQFQX1JTw1EmGMxvW';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: 'zhihu-img',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2
var resumeUploader = new qiniu.resume_up.ResumeUploader(config);
var putExtra = new qiniu.resume_up.PutExtra();
putExtra.fname = 'testfile.jpg';
putExtra.resumeRecordFile = 'progress.log';
var keyPrefix='upload/avatar/';

exports.uploadAvatar = function(fields,files,success,fail) {
	// 图片上传后的路径
	var localFile = files.avatar.path;
	var key = keyPrefix + fields._id+'_'+ files.avatar.name;
	resumeUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
	  respBody, respInfo) {
	  if (respErr) {
	    throw respErr;
	  }
	  if (respInfo.statusCode == 200) {
	  	console.log(respBody.key)
	    success(respBody.key)
	  } else {
	    fail(respBody)
	  }
	})
}