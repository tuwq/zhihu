export function getNowUserApi(data, callback) {
	axios.post(global.serverUrl+'/user/getNowUserInfo')
	.then((res)=> {
		callback(res)
	})
}

export function userReadAnswerApi(data, callback) {
	axios.post(global.serverUrl+'/user/read/answer',data)
	.then((res)=> {
		callback(res)
	})
}

export function userSaveInfoApi(data, callback) {
	axios.post(global.serverUrl+'/user/saveInfo',data)
	.then((res) =>{
		callback(res)
	})
}

export function userDetailApi(data, callback) {
	axios.post(global.serverUrl+'/user/detail',data)
	.then((res)=>{
		callback(res)
	})
}

export function userReadQuestionApi(data, callback) {
	axios.post(global.serverUrl+'/user/read/question',data)
	.then((res)=> {
		callback(res)
	})
}