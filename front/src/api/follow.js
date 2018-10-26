export function followTargetApi(data, callback) {
	axios.post(global.serverUrl+'/follow/followTarget',data)
	.then((res)=> {
		callback(res)
	})
}

export function followUserFansApi(data, callback) {
	axios.post(global.serverUrl+'/follow/user/fans',data)
	.then((res)=> {
		callback(res)
	})
}

export function followUserFollowApi(data, callback) {
	axios.post(global.serverUrl+'/follow/user/follow',data)
	.then((res)=> {
		callback(res)	
	})
}

