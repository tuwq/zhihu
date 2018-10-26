export function voteAnswerApi(data, callback) {
	axios.post(global.serverUrl+'/vote/answer',data)
	.then((res)=> {
		callback(res)
	})
}

export function answerInsertApi(data, callback) {
	axios.post(global.serverUrl+'/answer/insert',data)
	.then((res)=> {
		callback(res)
	})
}

export function answerRedApi(data, callback) {
	axios.post(global.serverUrl+'/answer/read',data)
	.then((res)=> {
		callback(res)
	})
}