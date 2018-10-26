export function cutAvatarApi(data, callback) {
	axios.post(global.serverUrl+'/user/cut',data)
	.then((res)=> {
	   callback(res)
  	})
}