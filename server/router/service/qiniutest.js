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
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

/*var localFile = "./bg5.jpg";
var key='upload/avatar/bg5.jpg';
// 文件上传
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {  
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});*/

var localFile = "./bg5.jpg";
var resumeUploader = new qiniu.resume_up.ResumeUploader(config);
var putExtra = new qiniu.resume_up.PutExtra();
putExtra.fname = 'testfile.jpg';
// 如果指定了断点记录文件，那么下次会从指定的该文件尝试读取上次上传的进度，以实现断点续传
putExtra.resumeRecordFile = 'progress.log';
var key='upload/avatar/bg5.jpg';
// 文件分片上传
resumeUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
  respBody, respInfo) {
  if (respErr) {
    throw respErr;
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});