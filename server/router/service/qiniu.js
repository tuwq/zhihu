const path = require('path')
const request = require('request')
const qiniu = require('qiniu')
const fs = require('fs')
/*const accessKey = '9DvpuH8KdIhIa9ggAXPJohaAx_T6tuSUvOvhgush';
const secretKey = 'HEQ4xwyADwlLjjHxSrYLyigzNDOoRFA2mJUuwvS0';
const publicBucketDomain = 'zhihu-img'
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
var bucketManager = new qiniu.rs.BucketManager(mac, config);
putExtra.fname = 'testfile.jpg';
putExtra.resumeRecordFile = 'progress.log';
const resourceUrl = 'http://resource.twenq.com/'
const keyPrefix='upload/avatar/';*/

exports.uploadAvatar2 = function(fields,files,success,fail) {
	// 图片上传后的路径
	var localFile = files.avatar.path;
	var key = keyPrefix + fields._id+'_'+ files.avatar.name;
	resumeUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
	  respBody, respInfo) {
	  if (respErr) {
	    throw respErr;
	  }
	  if (respInfo.statusCode == 200) {
	    success(respBody.key)
	  } else {
	    fail(respBody)
	  }
	})
}


exports.uploadAvatar = function (filePath, fileName, userId, success) {
	let key = keyPrefix + userId + '_' + new Date().getTime() + '_'+ fileName 

	resumeUploader.putFile(uploadToken, key, filePath, putExtra, function(respErr,
	  respBody, respInfo) {
	  if (respErr) {
	    throw respErr;
	  }
	  if (respInfo.statusCode == 200) {
	    success(respBody.key)
	  } else {
	    fail(respBody)
	  }
	})
}



exports.downLoadAvatar = function (avatarHTTPURL, success) {
	let localPath = path.join(__dirname, '..', '..', 'temp', 'avatar', avatarHTTPURL.replace(resourceUrl+keyPrefix, ''))
	// 公开空间访问链接
	request(avatarHTTPURL).pipe(fs.createWriteStream(localPath));
	success(localPath, avatarHTTPURL.replace(resourceUrl+keyPrefix, ''))
}