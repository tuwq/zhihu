export function setUserAvatarApi(formdata, callback) {
	axios.post(global.serverUrl+'/user/setAvatar',formdata,{
		headers:{'Content-Type':'multipart/form-data'}
	}).then((res)=>{
		callback(res)
	})
}